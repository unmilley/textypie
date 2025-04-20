<template>
	<dialog
		id="action-bar"
		class="modal modal-top justify-center pt-16"
		:open="isVisible"
		@click="close"
		@keydown.escape="close"
	>
		<div class="modal-box bg-base-200 w-128 rounded-xl" @click.stop="" @keydown.escape="close">
			<div class="card bg-base-200 w-auto">
				<div
					class="card-body grid transition-all p-1"
					:class="[list.length ? 'grid-rows-[0.1fr_1fr]' : 'grid-rows-[0.1fr_0fr]']"
				>
					<label class="input focus:outline-0 focus-within:outline-0 w-full">
						<Icon name="bx:search" size="1rem" class="opacity-50" />
						<input
							ref="inputElement"
							v-model="action"
							class="grow"
							type="text"
							@keydown.prevent.arrow-up="changeFocus('up')"
							@keydown.prevent.arrow-down="changeFocus('down')"
							@keydown.tab="changeFocus($event)"
							@keyup.enter="useAction()"
						/>
						<ActionBarPlaceholders :is-visible="!action" />
					</label>
					<!--  -->
					<div v-bind="containerProps" class="max-h-80 overflow-x-hidden overflow-y-scroll">
						<ul
							class="menu p-0 w-full flex-nowrap scroll-smooth"
							v-auto-animate="{ duration: 150 }"
							v-bind="wrapperProps"
						>
							<ActionBarItem
								v-for="{ index, data: { item } } in list"
								:key="index + item.name"
								:is-focused="index === focused"
								:item="item"
								@enter="useAction(index)"
							/>
						</ul>
					</div>
					<div
						v-show="list.length > 1"
						class="bg-base-200 pointer-events-none absolute bottom-0 left-0 right-4.5 h-16 transition-opacity [mask-image:linear-gradient(transparent,#000000)]"
						:class="{ 'opacity-0': list.length - 1 === focused }"
					></div>
				</div>
			</div>
		</div>
	</dialog>
</template>

<script lang="ts" setup>
import { vAutoAnimate } from '@formkit/auto-animate'
import defaultActions from '@/assets/.default.json'
import { importCustomScript } from '@/src/custom-scripts'
const { $customConfig: customConfig, $isTauri } = useNuxtApp()

const input = defineModel<string>({ required: true })

const { isVisible, close } = useModal('action-bar')
const inputElement = useTemplateRef('inputElement')

const action = shallowRef('')
const actions = computed((): Config[] => [...defaultActions, ...JSON.parse(customConfig)])

const { results } = useFuse(action, actions, {
	matchAllWhenSearchEmpty: true,
	fuseOptions: { findAllMatches: true, keys: ['name', 'description', 'tags'], threshold: 1 },
	resultLimit: 10,
})
const { list, containerProps, wrapperProps, scrollTo } = useVirtualList(results, {
	itemHeight: (i) => {
		const len = results.value[i]?.item.description.length ?? 50
		return len <= 50 ? 78 : 98
	},
})

const focused = ref(0)

const changeFocus = (toOrEvent: 'down' | 'up' | KeyboardEvent) => {
	if (typeof toOrEvent === 'object') {
		toOrEvent.preventDefault()
		return changeFocus(toOrEvent.shiftKey ? 'up' : 'down')
	}

	const len = results.value.length
	if (!len) {
		focused.value = 0
		return
	}

	if (toOrEvent === 'down') {
		focused.value = len - 1 === focused.value ? 0 : focused.value + 1
	} else if (toOrEvent === 'up') {
		focused.value = focused.value === 0 ? len - 1 : focused.value - 1
	}
}

const getModule = async (filename: string) => {
	const divided = filename.split('/')
	if (divided.length === 1) return import(`~/assets/Scripts/${divided[0]}.js`)

	if ($isTauri && divided.length === 2) return importCustomScript(divided[1] ?? '')
	return null
}

const useAction = async (index?: number) => {
	try {
		const act = results.value[index ?? focused.value]?.item
		if (!act) throw new Error('Action not found')

		const module = await getModule(act.filename)
		if (module.main) {
			const { data, error, info } = module.main(input.value)

			data && (input.value = data)
			info && push.info({ title: act.name, message: info })
			error && push.error({ title: act.name, message: error })
		} else {
			throw new Error('Action not found')
		}
	} catch (error: any) {
		console.log('error: ', error)
		push.error({ title: 'Error', message: error.message })
	} finally {
		close()
	}
}

watchImmediate(isVisible, (isVisible) => {
	if (isVisible) {
		setTimeout(() => {
			inputElement.value && inputElement.value.focus()
		}, 50)
	} else action.value = ''
})

watch(results, () => {
	focused.value = 0
})

watch(focused, scrollTo)
</script>

<style>
:root:has(:is(.modal[open])) {
	overflow: hidden;
	scrollbar-gutter: auto;
}
</style>

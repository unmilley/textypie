<template>
	<Modal name="action-bar" :buttons="{ enabled: false }" class="pt-16">
		<div class="card bg-base-200 w-auto">
			<div class="card-body p-1">
				<label class="input input-ghost w-full">
					<Icon name="bx:search" size="1rem" class="opacity-50" />

					<input
						ref="inputElement"
						v-model="action"
						type="text"
						class="grow"
						@keydown.prevent.arrow-up="changeFocus('up')"
						@keydown.prevent.arrow-down="changeFocus('down')"
						@keydown.tab="changeFocus($event)"
						@keyup.enter="useAction()"
					/>

					<ActionBarPlaceholders :is-visible="!action" />
				</label>
				<div class="relative">
					<div class="max-h-60 overflow-x-hidden overflow-y-scroll pb-4" v-if="results.length">
						<ul class="menu p-0 w-full">
							<li
								v-for="({ item }, idx) in results"
								:key="item.name"
								ref="list"
								class="scroll-mb-8"
								@mouseover="focused = idx"
							>
								<a class="alert" :class="{ 'menu-focus': idx === focused }" @click="useAction()">
									<Icon :name="item.icon" size="1.25rem" />
									<div>
										<h3 class="font-bold">{{ item.name }} - {{ idx }}</h3>
										<pre class="text-pretty text-xs">{{ item.description }}</pre>
									</div>
								</a>
							</li>
						</ul>
					</div>
					<div
						v-if="results.length"
						class="bg-base-100 pointer-events-none sticky bottom-0 -translate-y-12 -mt-6 flex h-16 [mask-image:linear-gradient(transparent,#000000)]"
					></div>
				</div>
			</div>
		</div>
	</Modal>
</template>

<script lang="ts" setup>
import defaultActions from '@/assets/.default.json'

const input = defineModel<string>({ required: true })

const { isVisible, close } = useModal('action-bar')
const inputElement = useTemplateRef('inputElement')

const action = shallowRef('')
const actions = ref(defaultActions)
const { results } = useFuse(action, actions, {
	matchAllWhenSearchEmpty: false,
	fuseOptions: { findAllMatches: true, keys: ['name', 'description'], threshold: 0.5 },
	resultLimit: 5,
})

const focused = ref(0)
const lists = useTemplateRef('list')

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

const useAction = async () => {
	try {
		const act = results.value[focused.value]?.item
		if (!act) throw new Error('Action not found')

		const module = await import(`~/assets/Scripts/${act.filename}.js`)
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

whenever(isVisible, () => {
	nextTick(() => inputElement.value && inputElement.value.focus())
})

watch(results, () => {
	focused.value = 0
})

watch(focused, (v) => {
	if (!lists.value || !lists.value[v]) return

	lists.value[v]?.scrollIntoView({
		inline: 'start',
		behavior: 'smooth',
		block: 'nearest',
	})
})
</script>

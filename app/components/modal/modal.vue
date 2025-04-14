<template>
	<Teleport to="#teleports">
		<ClientOnly>
			<transition @enter="toggleVisible" @leave="toggleVisible">
				<dialog
					v-if="isVisible"
					:id="key"
					:class="['modal modal-top', props.class]"
					@click="handleClose"
					@keydown.escape="handleClose"
				>
					<div class="modal-box p-0" :class="{ 'pt-4': !header }" @click.stop="" @keydown.escape="handleClose">
						<div v-if="header">
							<slot name="header" />
						</div>
						<slot />

						<div v-if="isButtonsEnabled" class="modal-action" :class="buttonPosition">
							<slot name="buttons">
								<button class="btn btn-error" @click="handleClose">Отменить</button>
								<button class="btn btn-success" @click="handleProceed">Продолжить</button>
							</slot>
						</div>
					</div>
				</dialog>
			</transition>
		</ClientOnly>
	</Teleport>
</template>

<script lang="ts" setup>
type Props = {
	name?: string
	class?: string
	header?: boolean
	buttons?: {
		enabled?: boolean
		position?: 'left' | 'right' | 'center' | 'between'
	}
}

const props = withDefaults(defineProps<Props>(), {
	class: '',
	header: true,
	buttons: () => ({
		enabled: true,
		position: 'right',
	}),
})

const modelValue = defineModel<boolean>({ required: false, default: () => false })

const { open, close, toggle, isVisible, key } = useModal(props.name)

const emit = defineEmits<{ closed: []; proceed: [] }>()

const isButtonsEnabled = computed(() => (typeof props.buttons.enabled === 'undefined' ? true : props.buttons.enabled))

const buttonPosition = computed(() => {
	const positionClasses = {
		left: 'justify-start',
		right: 'justify-end',
		center: 'justify-center',
		between: 'justify-between',
	}

	return positionClasses[props.buttons.position ?? 'right']
})

defineExpose({ open, close, toggle, isVisible })

const handleClose = () => {
	close()
	emit('closed')
}

const handleProceed = () => {
	close()
	emit('proceed')
}

watchImmediate(modelValue, (value, oldValue) => {
	if (value !== oldValue) toggle(value)
})

watch(isVisible, (value) => (modelValue.value = value))

const toggleVisible = (el: Element, done: () => void) => {
	el.classList.toggle('modal-open')
	setTimeout(done, 200)
}
</script>

<style>
:root:has(:is(.modal-open, .modal:target, .modal-toggle:checked + .modal, .modal[open])) {
	overflow: hidden;
	scrollbar-gutter: auto;
}
</style>

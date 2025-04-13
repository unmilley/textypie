<template>
	<Teleport to="body">
		<div
			id="titlebar"
			ref="titlebar"
			class="navbar bg-base-200 px-0 shadow-sm fixed inset-x-0 top-0 min-h-0 h-9 select-none"
			v-if="appWindow"
		>
			<div class="navbar-start"></div>
			<div class="navbar-center"></div>
			<div class="navbar-end">
				<button class="btn btn-ghost btn-square rounded-none" @click.stop="appWindow.minimize()">
					<Icon name="bx:minus" size="1.2rem" />
				</button>
				<button class="btn btn-ghost btn-square rounded-none" @click.stop="appWindow.toggleMaximize()">
					<Icon :name="iconMaximized.name" :size="iconMaximized.size" class="pointer-events-none" />
				</button>
				<button class="btn btn-ghost btn-square hover:btn-error rounded-none" @click.prevent.stop="appWindow.close()">
					<Icon name="bx:x" size="1.25rem" />
				</button>
			</div>
		</div>
	</Teleport>
</template>

<script lang="ts" setup>
import { getCurrentWindow, type Window } from '@tauri-apps/api/window'

const appWindow = ref<Window>(getCurrentWindow())
const [isMaximized, toggleLocalMaximized] = useToggle(false)
const iconMaximized = computed(() => {
	return isMaximized.value ? { name: 'bx:windows', size: '0.95rem' } : { name: 'bx:window', size: '0.85rem' }
})

appWindow.value.listen('tauri://resize', async () => {
	toggleLocalMaximized(await appWindow.value?.isMaximized())
})

const titlebar = useTemplateRef('titlebar')
useEventListener(titlebar, 'mousedown', (e) => {
	if (e.buttons !== 1) return
	if (['BUTTON', 'svg'].includes((e.target as HTMLElement).nodeName)) return
	e.preventDefault()
	e.detail === 2 ? appWindow.value?.toggleMaximize() : appWindow.value?.startDragging()
})
</script>

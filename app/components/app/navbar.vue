<template>
	<Teleport to="body">
		<div
			id="titlebar"
			ref="titlebar"
			class="navbar bg-base-300 px-0 shadow-sm fixed inset-x-0 top-0 min-h-0 h-9 select-none"
		>
			<div class="navbar-start">
				<AppMenu />
			</div>
			<div class="navbar-center">
				<Teleport to=".navbar-end" :disabled="!isMobile || $isTauri" v-if="isMounted">
					<ActionBarButton />
				</Teleport>
			</div>
			<div class="navbar-end">
				<slot />
			</div>
		</div>
	</Teleport>
</template>

<script lang="ts" setup>
import { getCurrentWindow, type Window } from '@tauri-apps/api/window'

const isMounted = useMounted()
const isMobile = useIsMobile()

const { $isTauri } = useNuxtApp()

if ($isTauri) {
	const appWindow: Window = getCurrentWindow()

	const titlebar = useTemplateRef('titlebar')
	useEventListener(titlebar, 'mousedown', (e) => {
		if (e.buttons !== 1) return
		if ((e.target as HTMLElement).parentElement?.id !== 'titlebar') return
		e.preventDefault()
		e.detail === 2 ? appWindow.toggleMaximize() : appWindow.startDragging()
	})
}
</script>

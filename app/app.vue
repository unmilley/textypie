<template>
	<Body class="w-dvw min-h-dvh bg-base-200 overflow-x-hidden" :class="bodyScroll">
		<NuxtLayout>
			<Notivue v-slot="item">
				<NotivueSwipe :item="item">
					<AppNotification :item="item" />
				</NotivueSwipe>
			</Notivue>
			<NuxtPage
				:transition="{
					name: 'page',
					mode: 'out-in',
				}"
			/>
		</NuxtLayout>
	</Body>
</template>

<script setup lang="ts">
const route = useRoute()

const bodyScroll = computed(() => (route.name === 'app' ? 'overflow-hidden' : ''))

const { open } = useModal('action-bar')

const { data: combination, isFinished } = useSettings<Combinations>('master-key', [
	{ key: 'Ctrl', code: 'ControlLeft' },
	{ key: 'q', code: 'KeyQ' },
])

const fn = (event: KeyboardEvent) => {
	const modifiedKey = new Set()
	if (event.ctrlKey) modifiedKey.add('ControlLeft')
	if (event.shiftKey) modifiedKey.add('ShiftLeft')
	if (event.altKey) modifiedKey.add('AltLeft')

	const [key0, key1] = combination.value

	if (modifiedKey.has(key0.code) && key1.code === event.code) {
		open()
		event.preventDefault()
	}
}

watch(
	combination,
	() => {
		if (!isFinished.value) return
		document.removeEventListener('keypress', fn)
		document.addEventListener('keypress', fn)
	},
	{ deep: true, immediate: true },
)

onMounted(async () => {
	await generateActions(true)
})
</script>

<style>
.page-enter-active,
.page-leave-active {
	transition: all 0.2s;
}
.page-enter-from,
.page-leave-to {
	opacity: 0;
	filter: blur(0.05rem);
}
</style>

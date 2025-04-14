<template>
	<Body class="w-dvw h-dvh bg-base-200 overflow-hidden">
		<NuxtLayout>
			<Notivue v-slot="item">
				<Notification :item="item" :theme="$colorMode.value === 'dark' ? darkTheme : lightTheme">
					<NotificationProgress :item="item" />
				</Notification>
			</Notivue>
			<NuxtPage />
		</NuxtLayout>
	</Body>
</template>

<script setup lang="ts">
import { darkTheme, lightTheme } from 'notivue'

const { open } = useModal('action-bar')

/* TODO: change useState to any storage in browser */
const combination = useState<Combinations>('master-key', () => [
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
		// console.log(`The ${combination.value.map(({ key }) => key).join(' + ')} combination was pressed!`)
		open()
		event.preventDefault()
	}
}

watch(
	combination,
	() => {
		document.removeEventListener('keypress', fn)
		document.addEventListener('keypress', fn)
	},
	{ deep: true, immediate: true },
)
</script>

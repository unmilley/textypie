import { isTauri } from '@tauri-apps/api/core'

export default defineNuxtPlugin(() => {
	return { provide: { isTauri: isTauri() } }
})

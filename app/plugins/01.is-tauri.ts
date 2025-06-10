import { isTauri as _isTauri } from '@tauri-apps/api/core'

export default defineNuxtPlugin(async () => {
	const isTauri = _isTauri()

	return { provide: { isTauri } }
})

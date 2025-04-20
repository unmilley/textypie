import { _init_ } from '@/src/custom-scripts'
import { isTauri as _isTauri } from '@tauri-apps/api/core'

export default defineNuxtPlugin(async () => {
	const isTauri = _isTauri()
	let customConfig = '[]'

	if (isTauri) {
		const { config } = await _init_()
		customConfig = config
	}

	return { provide: { isTauri, customConfig } }
})

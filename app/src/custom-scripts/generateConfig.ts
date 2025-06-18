import { BaseDirectory, readTextFile, type DirEntry } from '@tauri-apps/plugin-fs'
import { fn } from '.'
import { ConfigSchema } from '../schemas'

const META_REGEX = /\/\*\*([\s\S]*?)\*\//

export const generateConfig = async (entry: DirEntry): Promise<Config | null> => {
	const file = await readTextFile(fn(`/scripts/${entry.name}`), { baseDir: BaseDirectory.Home })

	const match = file.match(META_REGEX)

	if (match && match[1]) {
		const cleaned = match[1]
			.replace(/[\n\r\u0085\u2028\u2029]/g, '')
			.replace(/(\,)(\s*\})/g, '$2')
			.replace(/[^{}]*({[\s\S]*}).*/, '$1')
		let preConfig: Config
		try {
			const parsed = JSON.parse(cleaned)
			const result = ConfigSchema.safeParse(parsed)
			if (result.error && !result.data) throw new Error(result.error.message)

			preConfig = result.data
		} catch (error: any) {
			push.warning({ title: `Custom: [${entry.name}]`, message: `${error.message}`, duration: 1e4 })
			return null
		}
		preConfig.filename = `custom/${entry.name.replace('.js', '')}`
		return preConfig
	} else {
		console.warn('Meta-comment not found')
		push.warning({ title: `Custom: [${entry.name}]`, message: 'Meta-comment not found', duration: 1e4 })
		return null
	}
}

import type { Dirent } from 'fs'
import fs from 'fs/promises'
import path from 'path'

export type Config = {
	name: string
	description: string
	author: string
	icon: string
	tags: string
	filename?: string
}

const META_REGEX = /\/\*\*([\s\S]*?)\*\//

export const generateConfig = async (entry: Dirent<string>): Promise<Config | null> => {
	const file = await fs.readFile(path.join(entry.parentPath, entry.name), 'utf8')

	const match = file.match(META_REGEX)

	if (match && match[1]) {
		const cleaned = match[1]
			.replace(/[\n\r\u0085\u2028\u2029]/g, '')
			.replace(/(\,)(\s*\})/g, '$2')
			.replace(/[^{}]*({[\s\S]*}).*/, '$1')
		let preConfig: Config
		try {
			preConfig = JSON.parse(cleaned)
		} catch {
			return null
		}
		return preConfig
	} else {
		console.warn(`[${entry.name}]: Meta-comment not found`)
		return null
	}
}

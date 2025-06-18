import fs from 'fs/promises'
import path from 'path'
import { copyFile } from './copyFile'
import { generateConfig, type Config } from './generateConfig'

export const flattenCopy = async (srcDir: string, destDir: string, config: Config[] = []) => {
	const entries = await fs.readdir(srcDir, { withFileTypes: true })

	for await (const entry of entries) {
		const srcPath = path.join(srcDir, entry.name)
		const destPath = path.join(destDir, entry.name)

		if (entry.isDirectory()) {
			await flattenCopy(srcPath, destDir, config)
		} else if (entry.isFile()) {
			const preConfig = await generateConfig(entry)
			if (preConfig !== null) {
				const filename = await copyFile(srcPath, destPath, destDir, entry.name)
				preConfig.filename = filename
				config.push(preConfig)
			}
		}
	}
	return config
}

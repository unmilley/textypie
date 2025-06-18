import fs from 'fs/promises'
import path from 'path'

export const copyFile = async (srcPath: string, destPath: string, destDir: string, filename: string) => {
	let counter = 1
	let finalDestPath = destPath
	while (true) {
		try {
			await fs.access(finalDestPath)
			const ext = path.extname(filename)
			const name = path.basename(filename, ext)
			finalDestPath = path.join(destDir, `${name}_${counter}${ext}`)
			counter++
		} catch {
			break
		}
	}
	await fs.copyFile(srcPath, finalDestPath)
	const parts = finalDestPath.split(/[\\/]/)
	return parts[parts.length - 1]!.replace(/\.js$/, '')
}

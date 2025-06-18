import fs from 'fs/promises'
import { flattenCopy } from './flattenCopy'

const removeAssetsScripts = async () => {
	await fs.rm('app/assets/Scripts/', { recursive: true, force: true })
	await fs.rm('app/assets/.default.json', { force: true })
}

const main = async () => {
	console.time('Generate default scripts')
	const srcDir = 'scripts/default/'
	const destDir = 'app/assets/Scripts/'

	await fs.mkdir(destDir, { recursive: true })

	const config = await flattenCopy(srcDir, destDir)

	await fs.writeFile(`app/assets/.default.json`, JSON.stringify(config, null, 2), 'utf8')

	console.timeEnd('Generate default scripts')
}

await removeAssetsScripts()
await main()

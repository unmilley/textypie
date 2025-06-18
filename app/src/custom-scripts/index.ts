import { homeDir, join } from '@tauri-apps/api/path'
import {
	create as _create,
	BaseDirectory,
	exists,
	mkdir,
	readDir,
	readTextFile,
	writeTextFile,
} from '@tauri-apps/plugin-fs'
import { generateConfig } from './generateConfig'

export const fn = (filename: string) => `.textypie${filename}`

const isExists = (filename: string) => exists(fn(filename), { baseDir: BaseDirectory.Home })

const checkHomeDir = async () => {
	const createConfig = () => _create(fn('/config.json'), { baseDir: BaseDirectory.Home })
	const createScripts = () => mkdir(fn('/scripts'), { baseDir: BaseDirectory.Home })
	try {
		if (await isExists('')) {
			if (!(await isExists('/scripts'))) await createScripts()
			if (!(await isExists('/config.json'))) await createConfig()
			return
		}
		await mkdir(fn(''), { baseDir: BaseDirectory.Home })
		await createScripts()
		await createConfig()
	} catch (error) {
		console.log('error: ', error)
	}
}

const generateCustomConfig = async () => {
	try {
		const entries = await readDir(fn('/scripts'), { baseDir: BaseDirectory.Home })

		const config: Config[] = []
		for await (const entry of entries) {
			if (entry.isDirectory) continue
			const result = await generateConfig(entry)
			if (result !== null) config.push(result)
		}

		await writeTextFile(fn('/config.json'), JSON.stringify(config, null, 2), { baseDir: BaseDirectory.Home })
	} catch (error: any) {
		console.log('error: ', error)
		push.error({ title: 'Custom actions', message: error.message })
	}
	const config = await readTextFile(fn(`/config.json`), { baseDir: BaseDirectory.Home })
	return config
}

export const _init_ = async () => {
	await checkHomeDir()
	const config = await generateCustomConfig()

	return { config }
}

export const importCustomScript = async (filename: string) => {
	const homeDirPath = await homeDir()
	const modulePath = await join(homeDirPath, '.textypie', 'scripts', `${filename}.js`)
	try {
		const fileContent = await readTextFile(modulePath)

		const moduleBlob = new Blob([fileContent], { type: 'application/javascript' })
		const moduleUrl = URL.createObjectURL(moduleBlob)

		return import(/* @vite-ignore */ moduleUrl)
	} catch (error) {
		return null
	}
}

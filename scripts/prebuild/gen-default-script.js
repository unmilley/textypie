const generateDefaultScript = async () => {
	console.time('Generate default scripts')
	const fs = await import('fs')
	if (!fs) throw new Error('fs module not found')

	const sdDir = await fs.promises.readdir('Scripts/default')

	const config = []
	for (const name of sdDir) {
		if (!name.endsWith('.js')) continue
		const file = await fs.promises.readFile(`Scripts/default/${name}`, 'utf8')

		const regex = /\/\*\*([\s\S]*?)\*\//
		const match = file.match(regex)

		if (match && match[1]) {
			const cleaned = match[1]
				.replace(/[\n\r\u0085\u2028\u2029]/g, '')
				.replace(/(\,)(\s*\})/g, '$2')
				.replace(/[^{}]*({[\s\S]*}).*/, '$1')
			let preConfig
			try {
				preConfig = JSON.parse(cleaned)
			} catch {
				continue
			}
			preConfig.filename = name.split('.')[0]
			config.push(preConfig)
		} else {
			console.warn('Comment not found')
		}
	}

	await fs.promises.writeFile(`app/assets/.default.json`, JSON.stringify(config, null, 2), 'utf8')
	await fs.promises.cp('Scripts/default/', 'app/assets/Scripts/', { recursive: true })

	console.timeEnd('Generate default scripts')
}

await generateDefaultScript()

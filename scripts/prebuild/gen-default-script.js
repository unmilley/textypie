const generateDefaultScript = async () => {
	console.time('Generate default scripts')
	const fs = await import('fs')
	if (!fs) throw new Error('fs module not found')

	const currentTime = new Date()
	const { birthtime: creationTime } = await fs.promises
		.stat(`app/assets/.default.json`)
		.catch(() => ({ birthtime: new Date(0) }))
	const oneMinuteAgo = new Date(currentTime.getTime() - 1 * 60000)
	if (creationTime > oneMinuteAgo) return

	const sdDir = await fs.promises.readdir('Scripts/default')

	const config = []
	for (const name of sdDir) {
		if (!name.endsWith('.js')) continue
		const file = await fs.promises.readFile(`Scripts/default/${name}`, 'utf8')

		const regex = /\/\*\*([\s\S]*?)\*\//
		const match = file.match(regex)

		if (match && match[1]) {
			const comments = match[1].trim().replace(/\*$/, '')
			let preConfig
			try {
				preConfig = JSON.parse(comments)
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

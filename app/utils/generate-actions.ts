import defaultConfigJson from '@/assets/.default.json'
import * as customScripts from '@/src/custom-scripts'
import { compareArrays } from '@unmilley/compare-arrays'

const getDefaultScripts = async (): Promise<Config[]> => {
	if (!defaultConfigJson || !Array.isArray(defaultConfigJson)) {
		push.error({ title: 'Actions', message: 'Default actions not found' })
		return []
	}
	return defaultConfigJson
}
const getCustomScripts = async (): Promise<Config[]> => {
	const { config } = await customScripts._init_()
	return JSON.parse(config)
}

const log = (defLen: number, cusLen: number): void => {
	console.groupCollapsed(`Scripts ${new Date().toISOString()}`)
	console.log(`default scripts: ${defLen}`)
	console.log(`custom scripts: ${cusLen}`)
	console.groupEnd()
}

export const generateActions = async (isFirst = false) => {
	const defaultConfig = await getDefaultScripts()
	const customConfig = useNuxtApp().$isTauri ? await getCustomScripts() : []

	log(defaultConfig.length, customConfig.length)

	const actions = useState<Config[]>('actions', () => [])
	const newActions = [...defaultConfig, ...customConfig]

	if (!isFirst) {
		const { added, deleted } = compareArrays(actions.value, newActions, { withCounter: true })
		push.info({ title: 'Actions', message: `Added: ${added} | Deleted: ${deleted}` })
	}
	actions.value = [...newActions]
}

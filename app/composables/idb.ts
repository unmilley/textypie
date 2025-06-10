import { watchPausable, type ConfigurableFlush, type RemovableRef } from '@vueuse/core'
import { createStore, del, get, set, update } from 'idb-keyval'
import type { ShallowRef } from 'vue'

export interface IDBOptions extends ConfigurableFlush {
	/**
	 * Watch for deep changes
	 *
	 * @default true
	 */
	deep?: boolean
	/**
	 * Watch with throttle
	 *
	 * @default 0
	 */
	throttle?: number

	/**
	 * On error callback
	 *
	 * Default log error to `console.error`
	 */
	onError?: (error: unknown) => void

	/**
	 * Write the default value to the storage when it does not exist
	 *
	 * @default true
	 */
	writeDefaults?: boolean

	/**
	 * Name for database ['pieDB' => dbName]
	 *
	 * @default 'pieDB'
	 */
	dbName?: string

	/**
	 * Name for store ['berries' => storeName]
	 *
	 * @default 'berries'
	 */
	storeName?: string
}
export interface IDBReturn<T> {
	data: RemovableRef<T>
	isFinished: ShallowRef<boolean>
	set: (value: T) => Promise<void>
}

export const createIdb = <T>(key: IDBValidKey, initialValue: T, options: IDBOptions = {}): IDBReturn<T> => {
	const {
		flush = 'pre',
		deep = true,
		writeDefaults = true,
		dbName = 'pieDB',
		storeName = 'berries',
		throttle = 1000,
		onError = (e) => {
			console.error(e)
		},
	} = options

	const store = createStore(dbName, storeName)
	const isFinished = shallowRef(false)
	const data = useState<T>(`idb:${dbName}:${storeName}:${key}`, () => toValue(initialValue))

	const rawInit: T = toValue(initialValue)

	const read = async () => {
		try {
			const rawValue = await get<T>(key, store)
			if (rawValue === undefined) {
				if (rawInit !== undefined && rawInit !== null && writeDefaults) {
					await set(key, rawInit, store)
				}
			} else {
				data.value = rawValue
			}
		} catch (error) {
			onError(error)
		}
		isFinished.value = true
	}

	read()

	const write = async () => {
		try {
			if (data.value == null) {
				return await del(key, store)
			}
			await update(key, () => toRaw(data.value), store)
		} catch (error) {
			onError(error)
		}
	}

	const writeThrottle = useThrottleFn(write, throttle)

	const { pause: pauseWatch, resume: resumeWatch } = watchPausable(data, () => writeThrottle(), {
		flush,
		deep,
	})

	const setData = async (value: T): Promise<void> => {
		pauseWatch()
		data.value = value
		await write()
		resumeWatch()
	}

	return {
		set: setData,
		data: data as RemovableRef<T>,
		isFinished,
	}
}

import { watchPausable, type ConfigurableFlush, type RemovableRef } from '@vueuse/core'
import { createStore, del, get, set, update } from 'idb-keyval'
import type { MaybeRefOrGetter, ShallowRef } from 'vue'
import { shallowRef, toRaw, toValue } from 'vue'

export interface UseIDBOptions extends ConfigurableFlush {
	/**
	 * Watch for deep changes
	 *
	 * @default true
	 */
	deep?: boolean

	/**
	 * On error callback
	 *
	 * Default log error to `console.error`
	 */
	onError?: (error: unknown) => void

	/**
	 * Use shallow ref as reference
	 *
	 * @default false
	 */
	shallow?: boolean
	/**
	 * Write the default value to the storage when it does not exist
	 *
	 * @default true
	 */
	writeDefaults?: boolean

	/**
	 * Name for store [textypie>`storeName`]
	 *
	 * @default 'setting'
	 */
	storeName?: string
}

export interface UseIdStorageReturn<T> {
	data: RemovableRef<T>
	isFinished: ShallowRef<boolean>
	set: (value: T) => Promise<void>
}

export const useIdStorage = <T>(
	key: IDBValidKey,
	initialValue: MaybeRefOrGetter<T | undefined>,
	options: UseIDBOptions = {},
): UseIdStorageReturn<T> => {
	const {
		flush = 'pre',
		deep = true,
		onError = (e) => {
			console.error(e)
		},
		writeDefaults = true,
		storeName = 'setting',
	} = options

	const store = createStore('textypie', storeName)
	const isFinished = shallowRef(false)
	const data = useState(`iDB_${key.toString()}`, () => toValue(initialValue))

	const rawInit: T | undefined = toValue(initialValue)

	const read = async () => {
		try {
			const rawValue = await get<T>(key, store)
			if (rawValue === undefined) {
				if (rawInit !== undefined && rawInit !== null && writeDefaults) await set(key, rawInit, store)
			} else data.value = rawValue
		} catch (e) {
			onError(e)
		}
		isFinished.value = true
	}

	read()

	const write = async () => {
		try {
			if (data.value == null) {
				await del(key, store)
			} else {
				// IndexedDB does not support saving proxies, convert from proxy before saving
				await update(key, () => toRaw(data.value), store)
			}
		} catch (e: any) {
			onError(e)
			push.error(e.message)
		}
	}

	const { pause: pauseWatch, resume: resumeWatch } = watchPausable(data, async () => await write(), { flush, deep })

	const setData = async (value: T): Promise<void> => {
		pauseWatch()
		data.value = value
		await write()
		resumeWatch()
	}

	return {
		set: setData,
		isFinished,
		data: data as RemovableRef<T>,
	}
}

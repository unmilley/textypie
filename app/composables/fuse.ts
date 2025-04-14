import Fuse, { type FuseResult, type IFuseOptions } from 'fuse.js'

export type FuseOptions<T> = IFuseOptions<T>
export interface UseFuseOptions<T> {
	fuseOptions?: FuseOptions<T>
	resultLimit?: number
	matchAllWhenSearchEmpty?: boolean
}

export function useFuse<DataItem>(
	search: MaybeRefOrGetter<string>,
	data: MaybeRefOrGetter<DataItem[]>,
	options?: MaybeRefOrGetter<UseFuseOptions<DataItem>>,
) {
	const createFuse = () => new Fuse(toValue(data) ?? [], toValue(options)?.fuseOptions)

	const fuse = ref(createFuse())

	watchDeep(
		() => toValue(options)?.fuseOptions,
		() => {
			fuse.value = createFuse()
		},
	)

	watchDeep(
		() => toValue(data),
		(newData) => {
			fuse.value.setCollection(newData)
		},
	)

	const results = computed((): FuseResult<DataItem>[] => {
		const resolved = toValue(options)
		if (resolved?.matchAllWhenSearchEmpty && !toValue(search))
			return toValue(data).map((item, index) => ({ item, refIndex: index }))

		const limit = resolved?.resultLimit
		return fuse.value.search(toValue(search), limit ? { limit } : undefined)
	})

	return {
		fuse,
		results,
	}
}

export type UseFuseReturn = ReturnType<typeof useFuse>

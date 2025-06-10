export function useSettings<T>(key: IDBValidKey): IDBReturn<T>
export function useSettings<T>(key: IDBValidKey, value: T): IDBReturn<T>

export function useSettings<T>(key: IDBValidKey, value?: T) {
	return createIdb(key, value, { dbName: 'settings', storeName: 'index', throttle: 1000 })
}

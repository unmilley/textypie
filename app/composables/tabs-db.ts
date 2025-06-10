export const useTabsDB = <T>(key: string, value: T) => {
	return createIdb(key, value, { dbName: 'tabs', storeName: 'index', throttle: 5000 })
}

const InitialTab = { title: 'Untitled-1', content: '' }

const useTabsDB = <T>(key: string, value: T) => {
	return createIdb(key, value, { dbName: 'tabs', storeName: 'index', throttle: 5000 })
}

export const useTabs = () => {
	const { data: tabs } = useTabsDB<Tab[]>('tabs', [{ ...InitialTab }])
	const { data: activeTabTitle } = useTabsDB<string>('active', InitialTab.title)

	const activeTabIndex = computed(() => {
		const tabId = tabs.value.findIndex(({ title: t }) => t === activeTabTitle.value)
		return tabId === -1 || !tabs.value[tabId] ? 0 : tabId
	})

	const activeTabContent = computed({
		get: () => tabs.value[activeTabIndex.value]!.content,
		set: (v) => (tabs.value[activeTabIndex.value]!.content = v),
	})

	const changeActive = (idOrTitle?: string | number) => {
		if (typeof idOrTitle === 'undefined') {
			activeTabTitle.value = tabs.value[0]!.title
			return
		}
		changeActive()
		if (typeof idOrTitle === 'string') {
			const tabId = tabs.value.findIndex(({ title: t }) => t === idOrTitle)
			if (tabId === -1 || !tabs.value[tabId]) return
			activeTabTitle.value = idOrTitle
		} else {
			tabs.value[idOrTitle] && (activeTabTitle.value = tabs.value[idOrTitle].title)
		}
	}

	const addTab = (data: Partial<Tab>) => {
		if (!data.title) {
			const untitledTabsCount = tabs.value.reduce(
				(prev, curr) => (prev += curr.title.startsWith('Untitled') ? 1 : 0),
				0,
			)
			data.title = untitledTabsCount ? `Untitled-${untitledTabsCount + 1}` : 'Untitled-1'
		}
		if (!data.content) data.content = ''

		tabs.value.push({ ...(data as Tab) })
		changeActive(data.title)
	}

	const removeTab = (id: number) => {
		if (!tabs.value[id]) return

		if (tabs.value.length === 1) {
			tabs.value = [{ ...InitialTab }]
			return
		}

		const { title } = tabs.value[id]
		if (activeTabTitle.value === title) changeActive(id === 0 ? 0 : id - 1)
		tabs.value.splice(id, 1)
	}

	watchImmediate(tabs, ({ length }) => !length && addTab({}))

	return {
		tabs,
		activeTabTitle,
		activeTabContent,
		changeActive,
		addTab,
		removeTab,
	}
}

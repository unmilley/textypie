import { useStorage } from '@vueuse/core'

const state = reactive({
	actions: <Config[]>[],
})

export const useActions = () => {
	const { actions } = toRefs(state)
	const disabledActions = useStorage<string[]>('actions-disabled', [], localStorage)

	const actionsResult = computed(() => {
		return actions.value.filter(({ name }) => !disabledActions.value.includes(name))
	})

	const check = () => {
		const actionNames = actions.value.map(({ name }) => name)
		disabledActions.value = disabledActions.value.filter((name) => actionNames.includes(name))
	}

	return { actions, actionsResult, disabledActions, check }
}

export const useModal = (key?: string, initialStatus: boolean = false) => {
	key ??= useId()

	const isVisible = useState(`NUXT_MODAL_${key}`, () => initialStatus)
	const toggle = (value?: boolean) => {
		if (typeof value === 'undefined') isVisible.value = !isVisible.value
		else isVisible.value = value
	}
	const open = () => toggle(true)
	const close = () => toggle(false)

	return { isVisible, key, open, close, toggle }
}

export default defineNuxtPlugin((nuxtApp) => {
	const { $isTauri } = useNuxtApp()
	if ($isTauri) return

	/* Umami analytics */
	const { umamiId } = nuxtApp.$config.public

	if (umamiId) {
		useHead({
			script: [
				{
					src: 'https://eu.umami.is/script.js',
					type: 'text/javascript',
					defer: true,
					'data-website-id': umamiId,
				},
			],
		})
	}
})

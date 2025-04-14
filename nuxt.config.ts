import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
	compatibilityDate: '2025-03-22',
	devtools: { enabled: true },
	future: { compatibilityVersion: 4 },
	ssr: false,
	modules: ['@nuxt/icon', '@vueuse/nuxt', '@nuxtjs/color-mode', 'notivue/nuxt'],

	css: [
		'./assets/css/tailwind.css',
		'notivue/notification.css',
		'notivue/animations.css',
		'notivue/notification-progress.css',
	],

	icon: {
		mode: 'svg',
	},
	notivue: {
		position: 'bottom-right',
	},
	colorMode: {
		preference: 'system',
		fallback: 'dark',
		classSuffix: '',
		dataValue: 'theme',
		storageKey: 'theme',
		storage: 'cookie',
	},

	imports: { dirs: ['./types'] },

	vite: {
		plugins: [tailwindcss() as any],
		clearScreen: false,
		envPrefix: ['VITE_', 'TAURI_'],
		server: { strictPort: true },
	},
})

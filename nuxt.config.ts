import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
	compatibilityDate: '2025-03-22',
	devtools: { enabled: true },
	future: { compatibilityVersion: 4 },
	ssr: false,
	modules: ['@nuxt/icon', '@vueuse/nuxt', '@nuxtjs/color-mode', 'notivue/nuxt'],

	css: ['./assets/css/tailwind.css', 'notivue/animations.css'],

	icon: {
		mode: 'svg',
		customCollections: [{ dir: 'app/assets/icon', prefix: 'textypie' }],
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

	app: {
		head: {
			title: 'Textypie',
			link: [
				{ rel: 'preconnect', href: 'https://fonts.googleapis.com' },
				{ rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
				{ href: 'https://fonts.googleapis.com/css2?family=Fira+Code&display=swap', rel: 'stylesheet' },
			],
		},
	},

	imports: { dirs: ['./types'] },

	runtimeConfig: {
		public: {
			umamiId: '',
		},
	},

	vite: {
		plugins: [tailwindcss() as any],
		clearScreen: false,
		envPrefix: ['VITE_', 'TAURI_'],
		server: { strictPort: true },
	},
})

import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
	compatibilityDate: '2025-03-22',
	devtools: { enabled: true },
	future: { compatibilityVersion: 4 },
	ssr: false,
	modules: ['@nuxt/icon', '@vueuse/nuxt', '@nuxtjs/color-mode'],

	css: ['./assets/css/tailwind.css'],

	icon: {
		mode: 'svg',
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

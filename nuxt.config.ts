export default defineNuxtConfig({
	compatibilityDate: '2025-03-22',
	devtools: { enabled: true },
	ssr: false,

	vite: {
		clearScreen: false,
		envPrefix: ['VITE_', 'TAURI_'],
		server: {
			strictPort: true,
		},
	},
})

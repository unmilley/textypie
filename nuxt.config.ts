export default defineNuxtConfig({
	compatibilityDate: '2025-03-22',
	devtools: { enabled: true },
	future: { compatibilityVersion: 4 },
	ssr: false,

	imports: { dirs: ['./types'] },
	vite: {
		clearScreen: false,
		envPrefix: ['VITE_', 'TAURI_'],
		server: { strictPort: true },
	},
})

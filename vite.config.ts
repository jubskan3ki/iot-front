import { fileURLToPath, URL } from 'node:url';

import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [vue()],
	resolve: {
		alias: {
			'@': fileURLToPath(new URL('./src', import.meta.url)),
		},
	},
	css: {
		preprocessorOptions: {
			scss: {
				additionalData: `@use "@/assets/styles/abstracts/variables" as vars; @use "@/assets/styles/abstracts/mixins" as mix; @use "@/assets/styles/abstracts/functions" as func;`,
				api: 'modern-compiler',
			},
		},
	},
	build: {
		rollupOptions: {
			output: {
				manualChunks: {
					vendor: ['vue', 'pinia'],
					fontawesome: [
						'@fortawesome/fontawesome-svg-core',
						'@fortawesome/free-regular-svg-icons',
						'@fortawesome/vue-fontawesome',
					],
				},
			},
		},
		target: 'esnext',
		minify: 'esbuild',
	},
	server: {
		host: true,
		port: 3000,
	},
});

import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';

export default defineConfig({
	plugins: [svelte()],
	base: '/learn-svelte',
	server: {
		port: 3000,
		open: false
	}
});

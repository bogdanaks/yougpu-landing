import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),
	kit: {
		adapter: adapter({
			pages: 'build',
			assets: 'build',
			fallback: '404.html',
			precompress: true,
			strict: true
		}),
		paths: {
			relative: false
		},
		prerender: {
			origin: 'https://yougpu.ru',
			handleMissingId: 'warn'
		},
		alias: {
			'$app/*': 'src/app/*',
			'$processes/*': 'src/processes/*',
			'$pages/*': 'src/pages/*',
			'$widgets/*': 'src/widgets/*',
			'$features/*': 'src/features/*',
			'$entities/*': 'src/entities/*',
			'$shared/*': 'src/shared/*'
		}
	}
};

export default config;

import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { mdsvex, escapeSvelte } from 'mdsvex';
import { createHighlighter } from 'shiki';

const highlighter = await createHighlighter({
	themes: ['one-dark-pro'],
	langs: [
		'javascript',
		'typescript',
		'python',
		'bash',
		'svelte',
		'json',
		'yaml',
		'markdown',
		'html',
		'css'
	]
});

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', '.md'],
	preprocess: [
		vitePreprocess(),
		mdsvex({
			extensions: ['.md'],
			highlight: {
				highlighter: async (code, lang = 'text') => {
					const language = highlighter.getLoadedLanguages().includes(lang) ? lang : 'text';
					const html = highlighter.codeToHtml(code, {
						lang: language,
						theme: 'one-dark-pro'
					});
					const escapedHtml = escapeSvelte(html);
					return `{@html \`${escapedHtml}\` }`;
				}
			}
		})
	],
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
			handleMissingId: 'warn',
			handleHttpError: ({ path, message }) => {
				// Если ошибка 404 на картинке - просто выводим предупреждение и продолжаем билд
				if (path === '/og-image.png') {
					console.warn('⚠️ Игнорируем отсутствующую картинку OG');
					return;
				}

				// Для всех остальных ошибок — падаем (как обычно)
				throw new Error(message);
			}
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

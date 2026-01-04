import type { BlogPost } from './types';

// Подсчет времени чтения
export function calculateReadingTime(text: string): number {
	const words = text.trim().split(/\s+/).length;
	return Math.ceil(words / 200);
}

// Парсинг и сортировка всех постов
export function getBlogPosts(): BlogPost[] {
	const modules = import.meta.glob('/src/posts/*.md', { eager: true });
	const rawModules = import.meta.glob('/src/posts/*.md', { eager: true, query: '?raw' });

	return (
		Object.entries(modules)
			.map(([path, mod]: any) => {
				// 1. ЗАЩИТА: Получаем метаданные безопасно
				const metadata = mod?.metadata;

				// Если в файле нет метаданных или даты — это сломанный файл или черновик
				if (!metadata || !metadata.date) {
					console.warn(`⚠️ Пропуск файла: ${path} (Нет Frontmatter или даты)`);
					return null; // Возвращаем null, отфильтруем ниже
				}

				const rawContent = rawModules[path]?.default || '';
				const date = metadata.date;
				let lastUpdated = metadata.lastUpdated;

				if (lastUpdated === date) lastUpdated = null;

				return {
					slug: metadata.slug ?? path.split('/').pop()?.slice(0, -3) ?? '',
					readTime: calculateReadingTime(rawContent),
					tags: metadata.tags || ['Tech'],
					author: metadata.author || 'YouGPU Team',
					...metadata,
					lastUpdated
				};
			})
			// 2. ФИЛЬТР: Убираем null (битые файлы) и скрытые посты (published: false)
			.filter((post): post is BlogPost => post !== null && post.published !== false)
			.sort((a, b) => {
				const dateA = new Date(a.lastUpdated || a.date).getTime();
				const dateB = new Date(b.lastUpdated || b.date).getTime();
				return dateB - dateA;
			})
	);
}

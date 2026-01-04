import { error } from '@sveltejs/kit';

export async function load({ params }) {
	try {
		const post = await import(`../../../posts/${params.slug}.md`);

		return {
			content: post.default,
			meta: post.metadata
		};
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
	} catch (e) {
		console.log('e', e);
		throw error(404, 'Статья не найдена');
	}
}

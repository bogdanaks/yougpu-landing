<script lang="ts">
	import { onMount } from 'svelte';
	import { calculateReadingTime } from '$entities/blog/model/blog.utils';
	import type { BlogPost } from '$entities/blog/model/types';

	import PostMeta from '$entities/blog/ui/post-meta.svelte';
	import TableOfContents from '$entities/blog/ui/table-of-contents.svelte';
	import Tags from '$shared/ui/tags.svelte';

	export let data;

	$: postMeta = {
		date: data.meta.date,
		lastUpdated: data.meta.lastUpdated === data.meta.date ? null : data.meta.lastUpdated,
		readTime: 0,
		author: data.meta.author || 'YouGPU Team'
	};

	let headings: { id: string; text: string }[] = [];
	let articleContainer: HTMLElement;

	onMount(() => {
		if (!articleContainer) return;
		postMeta.readTime = calculateReadingTime(articleContainer.innerText);
		headings = Array.from(articleContainer.querySelectorAll('h2')).map((el, i) => ({
			id: el.id || (el.id = `h-${i}`),
			text: el.innerText
		}));
	});

	$: jsonLd = {
		'@context': 'https://schema.org',
		'@type': 'BlogPosting',
		headline: data.meta.title,
		description: data.meta.description,
		image: data.meta.image ? `https://yougpu.ru${data.meta.image}` : [],
		datePublished: postMeta.date,
		dateModified: postMeta.lastUpdated || postMeta.date,
		author: { '@type': 'Person', name: postMeta.author },
		abstract: data.meta.tldr ? data.meta.tldr.join('. ') : ''
	};
</script>

<svelte:head>
	<title>{data.meta.title} | YouGPU</title>
	<meta name="description" content={data.meta.description} />
	{@html `<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>`}
</svelte:head>

<div class="container mx-auto px-4 py-12">
	<a href="/blog" class="mb-8 inline-block text-brand-400 hover:underline">&larr; Назад в блог</a>

	<div class="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_300px]">
		<article class="min-w-0">
			<header class="mb-8 border-b border-slate-800 pb-8">
				<Tags tags={data.meta.tags} className="mb-4" />
				<h1 class="mb-4 text-4xl font-bold text-white md:text-5xl">{data.meta.title}</h1>
				<PostMeta post={postMeta as BlogPost} showAuthor={true} />
			</header>

			{#if data.meta.tldr}
				<div class="mb-10 rounded-xl border border-brand-500/20 bg-brand-500/5 p-6">
					<h3 class="mb-3 text-lg font-bold text-brand-300">TL;DR — Кратко:</h3>
					<ul class="list-disc space-y-2 pl-5 text-slate-300">
						{#each data.meta.tldr as item}
							<li>{item}</li>
						{/each}
					</ul>
				</div>
			{/if}

			<div
				bind:this={articleContainer}
				class="prose prose-invert prose-lg max-w-none prose-headings:scroll-mt-24 prose-headings:text-white prose-a:text-brand-400 prose-pre:border prose-pre:border-slate-800 prose-pre:bg-slate-900"
			>
				<svelte:component this={data.content} />
			</div>
		</article>

		<aside>
			<TableOfContents {headings} />
		</aside>
	</div>
</div>

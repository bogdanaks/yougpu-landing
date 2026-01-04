<script lang="ts">
	import { Search } from 'lucide-svelte';
	import { page } from '$app/stores';
	import { getBlogPosts } from '$entities/blog/model/blog.utils';
	import PostFeatured from '$entities/blog/ui/post-featured.svelte';
	import PostCard from '$entities/blog/ui/post-card.svelte';
	import { browser } from '$app/environment';

	const allPosts = getBlogPosts();
	let searchTerm = '';

	$: if (browser) {
		searchTerm = $page.url.searchParams.get('search') || '';
	}

	$: filteredPosts = allPosts.filter((p) => {
		const term = searchTerm.toLowerCase();
		return (
			p.title.toLowerCase().includes(term) ||
			p.description.toLowerCase().includes(term) ||
			p.tags.some((t) => t.toLowerCase().includes(term))
		);
	});

	$: featuredPost = !searchTerm && filteredPosts.length > 0 ? filteredPosts[0] : null;
	$: grid = featuredPost ? filteredPosts.slice(1) : filteredPosts;
</script>

<svelte:head>
	<title>Блог | YouGPU</title>
</svelte:head>

<div class="min-h-screen bg-slate-950 relative overflow-hidden text-white">
	<div
		class="absolute top-0 left-1/2 -translate-x-1/2 w-150 h-75 bg-brand-600/20 blur-[120px] rounded-full pointer-events-none opacity-30"
	></div>

	<div class="container mx-auto px-4 py-16 relative z-10">
		<div
			class="flex flex-col md:flex-row justify-between items-end mb-12 gap-6 border-b border-slate-800 pb-8"
		>
			<h1 class="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
				Наш <span class="text-transparent bg-clip-text bg-linear-to-r from-brand-400 to-purple-500"
					>Блог</span
				>
			</h1>
			<div class="relative w-full md:w-80">
				<Search class="absolute left-3 top-3.5 h-5 w-5 text-slate-500" />
				<input
					type="text"
					bind:value={searchTerm}
					placeholder="Поиск..."
					class="w-full pl-10 pr-3 py-3 border border-slate-800 rounded-xl bg-slate-900/50 text-slate-300 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
				/>
			</div>
		</div>

		{#if featuredPost}
			<PostFeatured post={featuredPost} />
		{/if}

		<div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
			{#each grid as post}
				<PostCard {post} />
			{/each}
		</div>

		{#if grid.length === 0 && !featuredPost}
			<div class="text-center py-20 text-slate-400">Ничего не найдено</div>
		{/if}
	</div>
</div>

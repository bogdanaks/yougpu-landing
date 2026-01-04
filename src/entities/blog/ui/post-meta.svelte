<script lang="ts">
	import { Calendar, Clock, RefreshCw, User } from 'lucide-svelte';
	import type { BlogPost } from '../model/types';

	export let post: BlogPost;
	export let showAuthor = false;
</script>

<div class="flex flex-wrap items-center gap-4 text-sm text-slate-400">
	{#if post.lastUpdated}
		<span class="flex items-center gap-1 text-brand-300" title={`Создано: ${post.date}`}>
			<RefreshCw class="w-4 h-4" /> Обновлено: {post.lastUpdated}
		</span>
	{:else}
		<span class="flex items-center gap-1">
			<Calendar class="w-4 h-4" />
			{post.date}
		</span>
	{/if}

	<span class="flex items-center gap-1">
		<Clock class="w-4 h-4" />
		{post.readTime} мин
	</span>

	{#if showAuthor && post.author}
		<span
			class="hidden sm:flex items-center gap-1 border-l border-slate-700 pl-4 ml-2 text-slate-300"
		>
			<User class="w-4 h-4 text-brand-400" />
			{post.author}
		</span>
	{/if}
</div>

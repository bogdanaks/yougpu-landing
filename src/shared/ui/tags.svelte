<script lang="ts">
	export let tags: string[] = [];
	export let className = '';
	export let limit: number | undefined = undefined;

	$: visibleTags = limit ? tags.slice(0, limit) : tags;
	$: remainingCount = limit && tags.length > limit ? tags.length - limit : 0;
</script>

{#if tags && tags.length > 0}
	<div class="flex flex-wrap gap-2 {className}">
		{#each visibleTags as tag}
			<a
				href="/blog?search={tag}"
				on:click|stopPropagation
				class="px-2 py-0.5 rounded-full bg-brand-500/10 text-brand-300 border border-brand-500/20 text-xs font-medium hover:bg-brand-500/20 hover:text-brand-200 transition-colors whitespace-nowrap"
			>
				{tag}
			</a>
		{/each}

		{#if remainingCount > 0}
			<span
				class="px-2 py-0.5 rounded-full bg-slate-800 text-slate-500 border border-slate-700 text-xs font-medium cursor-default"
			>
				+{remainingCount}
			</span>
		{/if}
	</div>
{/if}

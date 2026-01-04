<script lang="ts">
	import { Hash } from 'lucide-svelte';

	export let src: string | undefined = undefined;
	export let alt: string = '';

	export let className = '';

	let hasError = false;
</script>

<div
	class="{className} relative overflow-hidden bg-linear-to-br from-slate-800 to-slate-900 isolate"
>
	{#if src && !hasError}
		<img
			{src}
			{alt}
			on:error={() => (hasError = true)}
			loading="lazy"
			class="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
		/>

		<div
			class="absolute inset-0 bg-linear-to-t from-slate-900/40 to-transparent pointer-events-none"
		></div>
	{:else}
		<div class="absolute inset-0 flex items-center justify-center">
			<div class="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-20"></div>
			<Hash class="relative z-10 h-16 w-16 text-slate-700" />
		</div>
	{/if}
</div>

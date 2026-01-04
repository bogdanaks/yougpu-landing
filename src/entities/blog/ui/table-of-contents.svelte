<script lang="ts">
	import { appConfig } from '$shared/config/app-config';

	export let headings: { id: string; text: string }[] = [];
</script>

<div
	class="sticky top-24 max-h-[calc(100vh-8rem)] overflow-auto rounded-xl border border-slate-800 bg-slate-900/50 p-6 backdrop-blur-sm hidden lg:block"
>
	<h4 class="mb-4 text-sm font-bold uppercase tracking-wider text-slate-400">Оглавление</h4>
	{#if headings.length > 0}
		<nav class="flex flex-col space-y-3">
			{#each headings as heading}
				<a
					href="#{heading.id}"
					class="text-sm text-slate-400 transition-colors hover:text-brand-400 block"
					on:click|preventDefault={() =>
						document.getElementById(heading.id)?.scrollIntoView({ behavior: 'smooth' })}
				>
					{heading.text}
				</a>
			{/each}
		</nav>
	{:else}
		<p class="text-sm text-slate-600">Нет заголовков</p>
	{/if}

	<div class="mt-8 rounded-lg border border-slate-700 bg-slate-800 p-4">
		<p class="mb-2 text-sm font-medium text-white">Нужен GPU?</p>
		<a
			href={`${appConfig.CONSOLE_URL}/login`}
			class="block w-full rounded bg-brand-600 py-2 text-center text-sm font-bold text-white hover:bg-brand-500"
			>Найти сервер</a
		>
	</div>
</div>

<script lang="ts">
	import { page } from '$app/stores';
	import { Home, ServerCrash, ArrowRight } from 'lucide-svelte';
	import { appConfig } from '$shared/config/app-config';
</script>

<svelte:head>
	<title>Страница не найдена | YouGPU</title>
	<meta name="robots" content="noindex" />
</svelte:head>

<section
	class="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 py-24 md:py-32"
>
	<div aria-hidden="true" class="pointer-events-none absolute inset-0 z-0 overflow-hidden">
		<div
			class="absolute left-1/2 top-1/2 h-200 w-200 -translate-x-1/2 -translate-y-1/2 rotate-30 bg-linear-to-tr from-brand-600/20 to-purple-600/20 blur-[120px] opacity-40 md:h-200 md:w-200"
		></div>
	</div>

	<div class="container relative z-10 mx-auto px-4 text-center md:px-6">
		<div
			class="mb-8 inline-flex items-center rounded-full border border-red-500/30 bg-red-500/10 px-3 py-1 text-sm font-medium text-red-400 backdrop-blur"
		>
			<ServerCrash class="mr-2 h-4 w-4" />
			<span>
				{#if $page.status === 404}
					Error 404: Ресурс не найден
				{:else}
					Error {$page.status}: Ошибка системы
				{/if}
			</span>
		</div>

		<h1
			class="mx-auto max-w-4xl text-5xl font-extrabold tracking-tight text-white sm:text-6xl md:text-7xl"
		>
			{#if $page.status === 404}
				Эта страница <br class="hidden sm:block" />
				<span class="text-transparent bg-clip-text bg-linear-to-r from-brand-400 to-purple-500">
					не существует
				</span>
			{:else}
				Что-то пошло <br class="hidden sm:block" />
				<span class="text-transparent bg-clip-text bg-linear-to-r from-red-400 to-orange-500">
					не по плану
				</span>
			{/if}
		</h1>

		<p class="mx-auto mt-6 max-w-2xl text-lg text-slate-400 md:text-xl">
			{#if $page.status === 404}
				Страница, которую вы ищете, была перемещена, удалена или никогда не существовала. Похоже, мы
				зашли в тупиковую ветку.
			{:else}
				Произошла внутренняя ошибка. Наши инженеры уже получили уведомление и работают над
				исправлением.
			{/if}
		</p>

		<div
			class="mx-auto mt-10 max-w-lg overflow-hidden rounded-xl border border-slate-800 bg-slate-900/80 shadow-2xl backdrop-blur-sm"
		>
			<div class="flex items-center gap-2 border-b border-slate-800 bg-slate-900 px-4 py-2">
				<div class="h-3 w-3 rounded-full bg-red-500/50"></div>
				<div class="h-3 w-3 rounded-full bg-yellow-500/50"></div>
				<div class="h-3 w-3 rounded-full bg-green-500/50"></div>
				<div class="ml-2 text-xs font-mono text-slate-500">system_log — bash</div>
			</div>
			<div class="p-4 text-left font-mono text-sm">
				<div class="flex gap-2">
					<span class="text-brand-500">root@yougpu:~$</span>
					<span class="text-slate-300">curl {$page.url.pathname}</span>
				</div>
				<div class="mt-1 text-red-400">
					Error: {$page.status}
					{$page.error?.message || 'Not Found'}
				</div>
				<div class="mt-1 text-slate-500">Looking for available GPU nodes...</div>
				<div class="mt-1 flex gap-2">
					<span class="text-brand-500">root@yougpu:~$</span>
					<span class="animate-pulse">_</span>
				</div>
			</div>
		</div>

		<div class="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
			<a
				href="/"
				class="inline-flex h-12 w-full items-center justify-center rounded-md bg-brand-600 px-8 text-base font-semibold text-white transition-all hover:bg-brand-500 hover:shadow-lg hover:shadow-brand-500/25 sm:w-auto"
			>
				<Home class="mr-2 h-5 w-5" />
				На главную
			</a>
			<a
				href="{appConfig?.CONSOLE_URL ?? '#'}/deploy"
				class="inline-flex h-12 w-full items-center justify-center rounded-md border border-slate-700 bg-slate-900/50 px-8 text-base font-semibold text-white transition-colors hover:bg-slate-800/80 sm:w-auto"
			>
				Арендовать GPU
				<ArrowRight class="ml-2 h-5 w-5" />
			</a>
		</div>
	</div>
</section>

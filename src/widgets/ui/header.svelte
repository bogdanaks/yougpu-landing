<script lang="ts">
	import { page } from '$app/stores';
	import { appConfig } from '$shared/config/app-config';
	import { Menu, X } from 'lucide-svelte';
	import { slide } from 'svelte/transition';

	let isMenuOpen = false;

	function toggleMenu() {
		isMenuOpen = !isMenuOpen;
	}

	function closeMenu() {
		isMenuOpen = false;
	}

	function getNavLinkClass(path: string, exact = true) {
		const currentPath = $page.url.pathname;
		const isActive = exact ? currentPath === path : currentPath.startsWith(path);

		const baseClasses = 'transition-colors hover:text-white';

		return `${baseClasses} ${isActive ? 'text-white' : 'text-slate-400'}`;
	}
</script>

<header class="sticky top-0 z-50 w-full border-b border-slate-800 bg-slate-950/80 backdrop-blur-lg">
	<div class="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
		<a href="/" class="flex items-center gap-2 text-lg font-bold tracking-tight">
			<img alt="Logo" src="/logo.svg" width="40" height="40" />
			<span class="bg-linear-to-br from-white to-slate-400 bg-clip-text text-transparent">
				YouGPU
			</span>
		</a>

		<nav class="hidden gap-8 text-sm font-medium md:flex">
			<a href="/#features" class="text-slate-400 transition-colors hover:text-white">Преимущества</a
			>
			<a href="/pricing" class={getNavLinkClass('/pricing/')}>Цены</a>
			<a href="/#how-it-works" class="text-slate-400 transition-colors hover:text-white"
				>Как это работает</a
			>
			<a href="/blog" class={getNavLinkClass('/blog/', false)}>Блог</a>
		</nav>

		<div class="flex items-center gap-4">
			<a
				id="console-button"
				href={`${appConfig.CONSOLE_URL}/login`}
				class="rounded-md bg-brand-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-500"
			>
				Запустить консоль
			</a>
			<button
				class="text-slate-400 hover:text-white md:hidden focus:outline-none"
				on:click={toggleMenu}
				aria-label="Toggle menu"
			>
				{#if isMenuOpen}
					<X class="h-6 w-6" />
				{:else}
					<Menu class="h-6 w-6" />
				{/if}
			</button>
		</div>
	</div>

	{#if isMenuOpen}
		<div
			transition:slide={{ duration: 200 }}
			class="border-b border-slate-800 bg-slate-950 md:hidden"
		>
			<nav class="container mx-auto flex flex-col gap-4 p-4 text-sm font-medium">
				<a href="/#features" class="text-slate-400 hover:text-white" on:click={closeMenu}>
					Преимущества
				</a>
				<a href="/pricing" class={getNavLinkClass('/pricing/')} on:click={closeMenu}> Цены </a>
				<a href="/#how-it-works" class="text-slate-400 hover:text-white" on:click={closeMenu}>
					Как это работает
				</a>
				<a href="/blog" class={getNavLinkClass('/blog/', false)} on:click={closeMenu}> Блог </a>
			</nav>
		</div>
	{/if}
</header>

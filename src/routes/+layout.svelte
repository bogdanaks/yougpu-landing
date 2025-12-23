<script lang="ts">
	import YandexMetrika from '$widgets/ui/yandex-metrika.svelte';
	export const prerender = true;
	import '../app.css';
	import favicon from '$lib/assets/logo.png';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<YandexMetrika />
{@render children()}

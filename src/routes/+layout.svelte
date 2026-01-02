<script lang="ts">
	import '../app.css';
	import YandexMetrika from '$widgets/ui/yandex-metrika.svelte';
	import SeoBreadcrumbs from '$widgets/ui/seo-breadcrumbs.svelte';
	import favicon from '$lib/assets/logo.svg';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<YandexMetrika />
<SeoBreadcrumbs />
{@render children()}

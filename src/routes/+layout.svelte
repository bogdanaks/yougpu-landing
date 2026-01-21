<script lang="ts">
	import "../app.css";
	import YandexMetrika from "$widgets/ui/yandex-metrika.svelte";
	import SeoBreadcrumbs from "$widgets/ui/seo-breadcrumbs.svelte";
	let { children } = $props();
</script>

<YandexMetrika />
<SeoBreadcrumbs />
{@render children()}

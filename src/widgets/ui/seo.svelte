<script lang="ts">
	import { page } from '$app/state';
	import { siteConfig } from '$shared/config/seo-config';

	let {
		title = '',
		description = siteConfig.description,
		keywords = siteConfig.keywords,
		image = siteConfig.ogImage,
		type = 'website'
	} = $props();

	let metaTitle = $derived(
		title ? `${title} | ${siteConfig.name}` : `${siteConfig.name} — Аренда GPU серверов для AI и ML`
	);

	let currentUrl = $derived(page.url.href);
</script>

<svelte:head>
	<title>{metaTitle}</title>
	<meta name="description" content={description} />
	<meta name="keywords" content={keywords} />
	<link rel="canonical" href={currentUrl} />
	<meta name="robots" content="index, follow" />

	<meta property="og:site_name" content={siteConfig.name} />
	<meta property="og:locale" content="ru_RU" />
	<meta property="og:type" content={type} />
	<meta property="og:title" content={metaTitle} />
	<meta property="og:description" content={description} />
	<meta property="og:url" content={currentUrl} />
	<meta property="og:image" content={image} />

	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={metaTitle} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={image} />
</svelte:head>

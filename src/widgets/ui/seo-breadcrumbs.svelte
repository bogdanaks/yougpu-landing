<script lang="ts">
	import { page } from '$app/stores';
	import { siteConfig } from '$shared/config/site-config';

	const ROUTE_NAMES: Record<string, string> = {
		about: 'О нас',
		contact: 'Контакты'
	};

	$: pathSegments = $page.url.pathname.split('/').filter((s) => s !== '');

	$: breadcrumbList = [
		{
			'@type': 'ListItem',
			position: 1,
			name: 'Главная',
			item: siteConfig.url
		},
		...pathSegments.map((segment, index) => {
			const path = `${siteConfig.url}/${pathSegments.slice(0, index + 1).join('/')}`;

			const name =
				ROUTE_NAMES[segment] ||
				segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' ');

			return {
				'@type': 'ListItem',
				position: index + 2,
				name: name,
				item: path
			};
		})
	];

	$: schema = {
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		itemListElement: breadcrumbList
	};
</script>

<svelte:head>
	{@html `<script type="application/ld+json">${JSON.stringify(schema)}</script>`}
</svelte:head>

<script lang="ts">
	import { page } from '$app/stores';
	import { siteConfig } from '$shared/config/site-config';

	const LOGO_URL = `${siteConfig.url}/logo512.png`;
	const OG_IMAGE = `${siteConfig.url}/og-image.jpg`;

	$: currentUrl = $page.url.href;

	$: schemaGraph = {
		'@context': 'https://schema.org',
		'@graph': [
			// --- 1. ОРГАНИЗАЦИЯ (Бренд) ---
			{
				'@type': 'Organization',
				'@id': `${siteConfig.url}/#organization`,
				name: siteConfig.name,
				url: siteConfig.url,
				logo: {
					'@type': 'ImageObject',
					inLanguage: 'ru-RU',
					'@id': `${siteConfig.url}/#logo`,
					url: LOGO_URL,
					contentUrl: LOGO_URL,
					width: 512,
					height: 512,
					caption: siteConfig.name
				},
				sameAs: ['https://t.me/yougpu_chat', 'https://twitter.com/yougpu'],
				contactPoint: {
					'@type': 'ContactPoint',
					contactType: 'customer support',
					email: 'hello@yougpu.ru'
				}
			},

			// --- 2. ВЕБ-САЙТ (Search Box) ---
			{
				'@type': 'WebSite',
				'@id': `${siteConfig.url}/#website`,
				url: siteConfig.url,
				name: 'YouGPU — Аренда GPU серверов',
				description: 'Мощные серверы с NVIDIA RTX 4090 и A100 для AI и рендеринга.',
				publisher: { '@id': `${siteConfig.url}/#organization` },
				inLanguage: 'ru-RU'
			},

			// --- 3. ТЕКУЩАЯ СТРАНИЦА ---
			{
				'@type': 'WebPage',
				'@id': `${currentUrl}#webpage`,
				url: currentUrl,
				name: 'Аренда GPU серверов для обучения AI | YouGPU',
				isPartOf: { '@id': `${siteConfig.url}/#website` },
				about: { '@id': `${siteConfig.url}/#organization` },
				primaryImageOfPage: { '@id': `${siteConfig.url}/#primaryimage` },
				image: {
					'@type': 'ImageObject',
					'@id': `${siteConfig.url}/#primaryimage`,
					url: OG_IMAGE,
					width: 1200,
					height: 630
				},
				description:
					'Мгновенный доступ к GPU серверам. Поминутная оплата, root-доступ, готовое ML окружение.',
				breadcrumb: { '@id': `${currentUrl}#breadcrumb` }
			},
			// --- 4. ПРОДУКТ (Главная услуга) ---
			{
				'@type': 'Product',
				'@id': `${siteConfig.url}/#product`,
				name: 'Аренда облачного сервера с GPU',
				description:
					'Выделенные серверы с картами NVIDIA RTX 4090, A100, H100. Идеально для Deep Learning и 3D Render.',
				image: OG_IMAGE,
				brand: { '@id': `${siteConfig.url}/#organization` },
				aggregateRating: {
					'@type': 'AggregateRating',
					ratingValue: '4.9',
					reviewCount: '85',
					bestRating: '5',
					worstRating: '1'
				},
				offers: {
					'@type': 'AggregateOffer',
					lowPrice: '19.45',
					highPrice: '19.45',
					priceCurrency: 'RUB',
					offerCount: '100',
					availability: 'https://schema.org/InStock',
					seller: { '@id': `${siteConfig.url}/#organization` }
				}
			},

			// --- 5. FAQ (Вопросы-ответы для сниппета) ---
			{
				'@type': 'FAQPage',
				'@id': `${siteConfig.url}/#faq`,
				isPartOf: { '@id': `${currentUrl}#webpage` },
				mainEntity: [
					{
						'@type': 'Question',
						name: 'Как быстро я получу доступ к серверу?',
						acceptedAnswer: {
							'@type': 'Answer',
							text: 'Сервер разворачивается автоматически за 1-2 минуты после оплаты. Вы сразу получаете доступ к SSH или Jupyter Notebook.'
						}
					},
					{
						'@type': 'Question',
						name: 'Можно ли платить только за время использования?',
						acceptedAnswer: {
							'@type': 'Answer',
							text: 'Да, у нас работает поминутный биллинг. Вы можете остановить сервер в любой момент, чтобы не платить за простой.'
						}
					},
					{
						'@type': 'Question',
						name: 'Какой софт уже установлен?',
						acceptedAnswer: {
							'@type': 'Answer',
							text: 'Мы предоставляем образы с Ubuntu, Docker, драйверами NVIDIA, CUDA, а также PyTorch и TensorFlow.'
						}
					}
				]
			}
		]
	};
</script>

<svelte:head>
	{@html `<script type="application/ld+json">${JSON.stringify(schemaGraph)}</script>`}
</svelte:head>

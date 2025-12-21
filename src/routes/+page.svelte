<script lang="ts">
	import Header from '$lib/components/landing/Header.svelte';
	import Hero from '$lib/components/landing/Hero.svelte';
	import Features from '$lib/components/landing/Features.svelte';
	import GpuPricingPreview from '$lib/components/landing/GpuPricingPreview.svelte';
	import CtaSection from '$lib/components/landing/CtaSection.svelte';
	import Footer from '$lib/components/landing/Footer.svelte';
	import HowItWorks from '$lib/components/landing/HowItWorks.svelte';

	// SEO мета-данные (базовый пример)
	const title = 'YouGPU - Аренда GPU для AI и ML. Агрегатор мощностей.';
	const description =
		'Мгновенный доступ к NVIDIA A100, H100, RTX 4090 и другим GPU. Единый поиск по провайдерам, почасовая оплата, быстрый деплой.';
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta name="twitter:card" content="summary_large_image" />
</svelte:head>

<div class="min-h-screen bg-slate-950 flex flex-col">
	<Header />
	<main class="flex-1">
		<Hero />
		<Features />
		<HowItWorks />
		<GpuPricingPreview />
		<CtaSection />
	</main>
	<Footer />
</div>

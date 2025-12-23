<script lang="ts">
	import Hero from './ui/hero.svelte';
	import Features from './ui/features.svelte';
	import GpuPricingPreview from './ui/gpu-pricing-preview.svelte';
	import CtaSection from './ui/cta-section.svelte';
	import HowItWorks from './ui/how-it-works.svelte';
	import TechStack from './ui/tech-stack.svelte';

	let { data } = $props();
</script>

<Hero />
<Features />
<HowItWorks />
<TechStack />
<GpuPricingPreview gpuModels={data.gpuModels} />
<CtaSection />

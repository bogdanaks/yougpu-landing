<!-- <script lang="ts">
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
<CtaSection /> -->

<script lang="ts">
	import { onMount } from 'svelte';
	import ky from 'ky';
	import Big from 'big.js';
	import { appConfig } from '$shared/config/app-config';

	import Hero from './ui/hero.svelte';
	import Features from './ui/features.svelte';
	import GpuPricingPreview from './ui/gpu-pricing-preview.svelte';
	import CtaSection from './ui/cta-section.svelte';
	import HowItWorks from './ui/how-it-works.svelte';
	import TechStack from './ui/tech-stack.svelte';

	interface ServerResponse<T> {
		status: 'success';
		code: number;
		data: T | null;
		meta?: Record<string, unknown>;
	}

	interface GpuModel {
		id: string;
		provider: string;
		provider_model_id: string;
		name: string;
		gpu_model: string;
		gpu_count: number;
		vram_gb: number;
		cpu_cores: number;
		ram_gb: number;
		disk_type: string;
		disk_default_gb: number;
		disk_min_gb: number;
		disk_max_gb: number | null;
		created_at: string;
		updated_at: string;
	}

	interface InstanceOffer {
		id: string;
		is_available: boolean;
		model: GpuModel;
		region: string;
		price_hourly: string;
		disk_price_per_gb_hourly: string;
		disk_included_gb: number;
		currency: string;
		created_at: string;
		updated_at: string;
	}

	type AggregatedGroup = {
		name: string;
		minPrice: Big;
		vrams: Set<number>;
		regions: Set<string>;
		hasAvailability: boolean;
	};

	let gpuModels: {
		name: string;
		price: string;
		vram: string;
		available: boolean;
		popular: boolean;
		regions: string[];
	}[] = $state([]);
	let isLoading = $state(true);
	let error: unknown | null = $state(null);

	const LANDING_MODELS = ['H100', 'A100 80GB', 'H200', 'B200', 'RTX 6000 Ada', 'RTX A6000'];

	async function loadPrices() {
		try {
			const response = await ky
				.get(`${appConfig.API_URL}/catalog/search`)
				.json<ServerResponse<InstanceOffer[]>>();

			const offers = response.data ?? [];
			const groupedMap = new Map<string, AggregatedGroup>();

			for (const offer of offers) {
				const modelName = offer.model.gpu_model;

				if (!LANDING_MODELS.includes(modelName)) continue;

				const priceBig = Big(offer.price_hourly);

				if (!groupedMap.has(modelName)) {
					groupedMap.set(modelName, {
						name: modelName,
						minPrice: priceBig,
						vrams: new Set([offer.model.vram_gb]),
						regions: new Set([offer.region]),
						hasAvailability: offer.is_available
					});
				} else {
					const group = groupedMap.get(modelName)!;

					if (priceBig.lt(group.minPrice)) {
						group.minPrice = priceBig;
					}

					group.vrams.add(offer.model.vram_gb);
					group.regions.add(offer.region);

					if (offer.is_available) {
						group.hasAvailability = true;
					}
				}
			}

			gpuModels = Array.from(groupedMap.values())
				.map((group) => {
					const vramArray = Array.from(group.vrams).sort((a, b) => a - b);
					let vramDisplay = '';
					if (vramArray.length === 1) {
						vramDisplay = `${vramArray[0]} GB`;
					} else if (vramArray.length > 1) {
						vramDisplay = `${vramArray[0]} - ${vramArray[vramArray.length - 1]} GB`;
					} else {
						vramDisplay = 'N/A';
					}

					return {
						name: group.name,
						price: `${group.minPrice.toFixed(2)} ₽`,
						vram: vramDisplay,
						available: group.hasAvailability,
						popular: ['H100', 'A100 80GB', 'H200'].includes(group.name),
						regions: Array.from(group.regions)
					};
				})
				.sort((a, b) => LANDING_MODELS.indexOf(a.name) - LANDING_MODELS.indexOf(b.name));
		} catch (e) {
			console.error('Ошибка загрузки:', e);
			error = e;
		} finally {
			isLoading = false;
		}
	}

	onMount(() => {
		loadPrices();
	});
</script>

<Hero />
<Features />
<HowItWorks />
<TechStack />
{#if isLoading}
	<div class="py-24 text-center text-slate-500">Загрузка актуальных цен...</div>
{:else if error}
	<GpuPricingPreview gpuModels={[]} />
{:else}
	<GpuPricingPreview {gpuModels} />
{/if}
<CtaSection />

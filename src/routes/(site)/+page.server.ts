import ky from 'ky';
import Big from 'big.js';
import type { PageServerLoad } from './$types';
import { appConfig } from '$shared/config/app-config';

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

const LANDING_MODELS = ['H100', 'A100 80GB', 'H200', 'B200', 'RTX 6000 Ada', 'RTX A6000'];

type AggregatedGroup = {
	name: string;
	minPrice: Big;
	vrams: Set<number>;
	regions: Set<string>;
	hasAvailability: boolean;
};

export const load: PageServerLoad = async () => {
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

		const gpuModels = Array.from(groupedMap.values())
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

		return { gpuModels };
	} catch (error) {
		console.error('Ошибка загрузки цен:', error);
		return { gpuModels: [] };
	}
};

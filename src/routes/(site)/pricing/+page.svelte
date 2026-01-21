<script lang="ts">
	import { onMount } from "svelte";
	import { appConfig } from "$shared/config/app-config";
	import { CircleX, Search, ArrowRight, Loader2 } from "lucide-svelte";
	import { formatMoney } from "$shared/lib/utils";
	import Seo from "$widgets/ui/seo.svelte";

	interface ServerResponse<T> {
		status: "success";
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
		model: GpuModel;
		region: string;
		price_hourly: string;
		disk_price_per_gb_hourly: string;
		disk_included_gb: number;
		currency: string;
		created_at: string;
		updated_at: string;
	}

	let offers: InstanceOffer[] = [];
	let isLoading = true;
	let error: string | null = null;
	let searchQuery = "";

	async function loadPrices() {
		try {
			const response = await fetch(`${appConfig.API_URL}/catalog/offer`);

			if (!response.ok) throw new Error("Ошибка сети");

			const result: ServerResponse<InstanceOffer[]> = await response.json();

			if (result.status === "success" && result.data) {
				offers = result.data;
			} else {
				throw new Error("Некорректный формат ответа");
			}
		} catch (err) {
			console.error(err);
			error = "Не удалось загрузить данные. Попробуйте позже.";
		} finally {
			isLoading = false;
		}
	}

	onMount(() => {
		loadPrices();
	});

	$: filteredOffers = offers.filter(
		(offer) =>
			offer.model.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
			offer.model.gpu_model.toLowerCase().includes(searchQuery.toLowerCase())
	);
</script>

<Seo title="Цены" />

<div class="min-h-screen bg-slate-950 text-white relative overflow-hidden">
	<div aria-hidden="true" class="absolute inset-0 z-0 overflow-hidden pointer-events-none"></div>

	<div class="container relative z-10 mx-auto px-4 py-24 md:py-32">
		<div class="text-center max-w-3xl mx-auto mb-16">
			<h1 class="text-4xl font-extrabold tracking-tight sm:text-5xl mb-6">
				Прозрачное ценообразование
			</h1>
			<p class="text-lg text-slate-400">
				Никаких скрытых платежей. Платите только за время использования GPU. Минутная тарификация и
				мгновенный доступ к мощностям.
			</p>
		</div>

		<div class="flex flex-col md:flex-row gap-4 justify-between items-center mb-8">
			<div class="relative w-full md:w-96 group">
				<div
					class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500"
				>
					<Search class="h-5 w-5" />
				</div>
				<input
					type="text"
					bind:value={searchQuery}
					placeholder="Поиск по модели..."
					class="block w-full pl-10 pr-3 py-2.5 border border-slate-800 rounded-lg bg-slate-900/50 text-slate-300 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all"
				/>
			</div>
		</div>

		<div
			class="overflow-hidden rounded-xl border border-slate-800 bg-slate-950/80 shadow-2xl backdrop-blur-md min-h-100 flex flex-col"
		>
			{#if isLoading}
				<div class="flex-1 flex flex-col items-center justify-center p-12 text-slate-400">
					<Loader2 class="h-10 w-10 animate-spin text-brand-500 mb-4" />
					<p class="text-sm font-medium">Загружаем актуальные цены...</p>
				</div>
			{:else if error}
				<div class="flex-1 flex flex-col items-center justify-center p-12 text-red-400">
					<CircleX class="h-10 w-10 mb-4" />
					<p class="text-lg font-medium">Ошибка загрузки</p>
					<p class="text-sm text-slate-500 mt-2">{error}</p>
				</div>
			{:else}
				<div class="overflow-x-auto">
					<table class="w-full text-left text-sm">
						<thead class="bg-slate-900/80 text-slate-400 border-b border-slate-800">
							<tr>
								<th class="px-6 py-5 font-semibold">Модель GPU</th>
								<th class="px-6 py-5 font-semibold">Характеристики</th>
								<th class="px-6 py-5 font-semibold">CPU / RAM</th>
								<th class="px-6 py-5 font-semibold">Статус</th>
								<th class="px-6 py-5 font-semibold text-right">Цена</th>
								<th class="px-6 py-5 font-semibold text-right">Действие</th>
							</tr>
						</thead>
						<tbody class="divide-y divide-slate-800">
							{#if filteredOffers.length === 0}
								<tr>
									<td colspan="6" class="px-6 py-12 text-center text-slate-500">
										По вашему запросу ничего не найдено
									</td>
								</tr>
							{/if}

							{#each filteredOffers as offer}
								<tr class="group hover:bg-slate-900/40 transition-colors">
									<td class="px-6 py-5">
										<div class="flex flex-col gap-1.5">
											<span class="font-bold text-white text-base flex items-center gap-2">
												{offer.model.name}
											</span>
											<span class="text-xs text-slate-500">{offer.region}</span>
										</div>
									</td>

									<td class="px-6 py-5">
										<div class="flex flex-col gap-1 text-slate-300">
											<span class="flex items-center gap-2">
												<span class="w-16 text-slate-500 text-xs uppercase tracking-wider"
													>VRAM</span
												>
												<span class="font-medium text-white">{offer.model.vram_gb} GB</span>
											</span>
											<span class="flex items-center gap-2">
												<span class="w-16 text-slate-500 text-xs uppercase tracking-wider"
													>Кол-во</span
												>
												<span>x{offer.model.gpu_count}</span>
											</span>
										</div>
									</td>

									<td class="px-6 py-5">
										<div class="text-slate-400 text-xs space-y-1">
											<div>
												CPU: <span class="text-slate-300">{offer.model.cpu_cores} vCores</span>
											</div>
											<div>RAM: <span class="text-slate-300">{offer.model.ram_gb} GB</span></div>
										</div>
									</td>

									<td class="px-6 py-5">
										<div class="flex items-center text-emerald-400 text-sm font-medium">
											<div class="relative flex h-2.5 w-2.5 mr-2">
												<span
													class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"
												></span>
												<span class="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"
												></span>
											</div>
											В наличии
										</div>
									</td>

									<td class="px-6 py-5 text-right">
										<div class="flex flex-col items-end">
											<span class="text-xl font-bold text-white tracking-tight">
												{formatMoney(offer.price_hourly)}
											</span>
											<span class="text-xs text-slate-500">за час</span>
										</div>
									</td>

									<td class="px-6 py-5 text-right">
										<a
											href={`${appConfig.CONSOLE_URL}/instances/offer/${offer.id}`}
											class={`inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium transition-all border-2 border-brand-800 text-white hover:border-brand-600 `}
										>
											Арендовать
											<ArrowRight class="ml-2 h-4 w-4" />
										</a>
									</td>
								</tr>
							{/each}
						</tbody>
					</table>
				</div>
			{/if}
		</div>
	</div>
</div>

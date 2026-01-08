<script lang="ts">
	import { appConfig } from '$shared/config/app-config';
	import { CircleCheck, CircleX } from 'lucide-svelte';

	type GpuModel = {
		name: string;
		vram: string;
		price: string;
		available: boolean;
		popular: boolean;
	};

	export let gpuModels: GpuModel[] = [];
</script>

<section id="pricing" class="py-24 relative">
	<div class="container mx-auto px-4 md:px-6 relative z-10">
		<div class="text-center mb-16">
			<h2 class="text-3xl font-bold tracking-tight sm:text-4xl">Популярные конфигурации</h2>
			<p class="mt-4 text-lg text-slate-400 max-w-2xl mx-auto">Доступные GPU и цены за час.</p>
		</div>

		<div
			class="overflow-hidden rounded-xl border border-slate-800 bg-slate-950/80 shadow-2xl md:max-w-4xl mx-auto backdrop-blur"
		>
			<div class="overflow-x-auto">
				<table class="w-full text-left text-sm">
					<thead class="border-b border-slate-800 bg-slate-900/50">
						<tr>
							<th class="px-6 py-4 font-medium text-slate-300">Модель GPU</th>
							<th class="px-6 py-4 font-medium text-slate-300">VRAM</th>
							<th class="px-6 py-4 font-medium text-slate-300">Цена / час (от)</th>
							<th class="px-6 py-4 font-medium text-slate-300 text-center">Статус</th>
						</tr>
					</thead>
					<tbody class="divide-y divide-slate-800">
						{#each gpuModels as gpu}
							<tr
								class="hover:bg-slate-900/30 transition-colors {gpu.popular
									? 'bg-brand-950/10'
									: ''}"
							>
								<td class="px-6 py-4 font-medium text-white flex items-center gap-2">
									{gpu.name}
									{#if gpu.popular}
										<span
											class="inline-flex items-center rounded-full bg-brand-500/20 px-2 py-0.5 text-xs font-medium text-brand-300"
										>
											Популярное
										</span>
									{/if}
								</td>
								<td class="px-6 py-4 text-slate-300">{gpu.vram}</td>
								<td class="px-6 py-4 font-bold text-white">{gpu.price}</td>
								<td class="px-6 py-4 flex justify-center">
									{#if gpu.available}
										<div class="flex items-center text-emerald-400 text-xs font-medium">
											<CircleCheck class="h-4 w-4 mr-1.5" /> В наличии
										</div>
									{:else}
										<div class="flex items-center text-slate-500 text-xs font-medium">
											<CircleX class="h-4 w-4 mr-1.5" /> Мало
										</div>
									{/if}
								</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
			<div class="bg-slate-900/50 p-4 text-center border-t border-slate-800">
				<a
					href="/pricing"
					class="text-brand-400 hover:text-brand-300 text-sm font-medium transition-colors"
				>
					Посмотреть весь каталог и наличие →
				</a>
			</div>
		</div>
	</div>
</section>

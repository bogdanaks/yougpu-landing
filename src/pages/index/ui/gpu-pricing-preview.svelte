<script lang="ts">
	import { CheckCircle2, XCircle } from 'lucide-svelte';

	// Это моковые данные для лендинга. В реальном приложении они могут быть динамическими.
	const gpuModels = [
		{ name: 'NVIDIA H100', vram: '80 GB HBM3', price: '$2.50', available: true, popular: true },
		{ name: 'NVIDIA A100', vram: '80 GB HBM2e', price: '$1.30', available: true, popular: false },
		{ name: 'NVIDIA A6000', vram: '48 GB GDDR6', price: '$0.60', available: true, popular: true },
		{
			name: 'NVIDIA RTX 4090',
			vram: '24 GB GDDR6X',
			price: '$0.35',
			available: false,
			popular: false
		},
		{ name: 'NVIDIA V100', vram: '32 GB HBM2', price: '$0.28', available: true, popular: false }
	];
</script>

<section id="pricing" class="py-24 relative">
	<div class="container mx-auto px-4 md:px-6 relative z-10">
		<div class="text-center mb-16">
			<h2 class="text-3xl font-bold tracking-tight sm:text-4xl">Популярные конфигурации</h2>
			<p class="mt-4 text-lg text-slate-400 max-w-2xl mx-auto">
				Примеры доступных GPU и ориентировочные цены за час. Актуальное наличие проверяйте в
				консоли.
			</p>
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
											<CheckCircle2 class="h-4 w-4 mr-1.5" /> В наличии
										</div>
									{:else}
										<div class="flex items-center text-slate-500 text-xs font-medium">
											<XCircle class="h-4 w-4 mr-1.5" /> Мало
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
					href="/login"
					class="text-brand-400 hover:text-brand-300 text-sm font-medium transition-colors"
				>
					Посмотреть весь каталог и наличие →
				</a>
			</div>
		</div>
	</div>
</section>

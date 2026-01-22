<script lang="ts">
	import { appConfig } from "$shared/config/app-config";
	import {
		Cpu,
		Zap,
		ArrowRight,
		BarChart3,
		Layers,
		Server,
		Database,
		Scale,
		Check
	} from "lucide-svelte";

	// Бенчмарки: акцент на пропускную способность памяти по сравнению с версией 40GB
	const benchmarks = [
		{ name: "Memory Bandwidth", value: 100, label: "2.039 GB/s", sub: "A100 80GB" },
		{ name: "Memory Bandwidth", value: 75, label: "1.555 GB/s", sub: "A100 40GB" },
		{ name: "Large Model Fine-Tuning", value: 100, label: "100% eff.", sub: "A100 80GB" },
		{ name: "Large Model Fine-Tuning", value: 50, label: "OOM Error", sub: "RTX 4090" } // Out Of Memory
	];

	const specs = [
		{ label: "Архитектура", value: "NVIDIA Ampere" },
		{ label: "VRAM", value: "80 GB HBM2e" },
		{ label: "Пропускная способность", value: "2.0 TB/s" },
		{ label: "FP16 Tensor Core", value: "312 TFLOPS" },
		{ label: "Интерконнект", value: "NVLink 600 GB/s" },
		{ label: "Потребление (TDP)", value: "400W (SXM4)" }
	];

	const useCases = [
		{
			title: "Fine-Tuning LLM",
			desc: "Идеальный баланс памяти для дообучения Llama 3 70B, Mixtral 8x7B без квантования."
		},
		{
			title: "Batch Inference",
			desc: "Максимальная пропускная способность для обработки огромных массивов данных в продакшене."
		},
		{
			title: "Data Science",
			desc: "Обработка табличных данных (RAPIDS) и графовых нейросетей, требующих большой памяти."
		}
	];
</script>

<svelte:head>
	<title>Аренда NVIDIA A100 80GB — YouGPU</title>
	<meta
		name="description"
		content="Аренда серверов с NVIDIA A100 80GB. Лучшая цена для обучения и файнтюнинга нейросетей. Поминутный биллинг."
	/>
</svelte:head>

<section class="relative overflow-hidden py-24 md:py-32 bg-slate-950">
	<div aria-hidden="true" class="absolute inset-0 z-0 overflow-hidden pointer-events-none">
		<div
			class="absolute right-[20%] top-0 h-125 w-125 -translate-y-1/2 bg-blue-600/20 blur-[120px] opacity-40"
		></div>
	</div>

	<div class="container relative z-10 mx-auto px-4 md:px-6 text-center">
		<div
			class="inline-flex items-center rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-sm font-medium text-blue-400 mb-8 backdrop-blur"
		>
			<Server class="mr-2 h-4 w-4" />
			<span>Золотой стандарт индустрии ML</span>
		</div>

		<h1
			class="mx-auto max-w-5xl text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-7xl"
		>
			NVIDIA <span class="text-blue-500">A100</span> 80GB
		</h1>

		<p class="mx-auto mt-6 max-w-2xl text-lg text-slate-400 md:text-xl">
			Самая популярная видеокарта для AI. Увеличенный объем памяти HBM2e позволяет работать с
			моделями, которые не помещаются на A100 40GB.
		</p>

		<div class="mt-10 flex flex-col items-center justify-center gap-6">
			<div class="flex items-baseline gap-2">
				<span class="text-4xl font-bold text-white">~175 ₽</span>
				<span class="text-slate-500">/ час</span>
			</div>

			<div class="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
				<a
					href={`${appConfig.CONSOLE_URL}/instances/`}
					class="inline-flex h-12 items-center justify-center rounded-md bg-brand-600 px-8 text-base font-semibold text-white transition-all hover:bg-brand-500 hover:shadow-lg hover:shadow-brand-500/25 w-full sm:w-auto"
				>
					Арендовать A100
					<ArrowRight class="ml-2 h-5 w-5" />
				</a>
				<a
					href="#specs"
					class="inline-flex h-12 items-center justify-center rounded-md border border-slate-700 bg-slate-900/50 px-8 text-base font-semibold text-white transition-colors hover:bg-slate-800/80 w-full sm:w-auto"
				>
					Характеристики
				</a>
			</div>
		</div>
	</div>
</section>

<section id="specs" class="py-20 bg-slate-900/30 border-y border-slate-800">
	<div class="container mx-auto px-4 md:px-6">
		<div class="flex items-center gap-3 mb-10">
			<Database class="h-6 w-6 text-blue-500" />
			<h2 class="text-2xl font-bold text-white">Спецификации</h2>
		</div>

		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
			{#each specs as spec}
				<div
					class="p-6 rounded-xl border border-slate-800 bg-slate-950/50 backdrop-blur hover:border-blue-500/30 transition-colors"
				>
					<div class="text-sm text-slate-500 mb-1">{spec.label}</div>
					<div class="text-xl font-semibold text-white">{spec.value}</div>
				</div>
			{/each}
		</div>
	</div>
</section>

<section class="py-24 relative">
	<div class="container mx-auto px-4 md:px-6">
		<div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
			<div>
				<div class="flex items-center gap-3 mb-8">
					<Scale class="h-6 w-6 text-blue-500" />
					<h2 class="text-3xl font-bold text-white">Почему именно 80GB?</h2>
				</div>
				<p class="text-slate-400 mb-8 text-lg">
					Многие путают A100 40GB и 80GB. Разница не только в объеме памяти, но и в её скорости.
					Версия на 80GB использует более быструю память HBM2e, что дает прирост производительности
					до 25% в задачах, ограниченных пропускной способностью.
				</p>

				<ul class="space-y-4">
					<li class="flex items-start gap-3">
						<div class="mt-1 rounded-full bg-blue-500/10 p-1 text-blue-400">
							<Check class="h-4 w-4" />
						</div>
						<span class="text-slate-300">Вмещает Llama-3 70B целиком (в 8-bit) на одной карте</span>
					</li>
					<li class="flex items-start gap-3">
						<div class="mt-1 rounded-full bg-blue-500/10 p-1 text-blue-400">
							<Check class="h-4 w-4" />
						</div>
						<span class="text-slate-300"
							>В 2 раза больше батч-сайз при обучении = быстрее сходимость</span
						>
					</li>
					<li class="flex items-start gap-3">
						<div class="mt-1 rounded-full bg-blue-500/10 p-1 text-blue-400">
							<Check class="h-4 w-4" />
						</div>
						<span class="text-slate-300">Идеально для мульти-GPU кластеров (NVLink)</span>
					</li>
				</ul>
			</div>

			<div class="bg-slate-950 border border-slate-800 rounded-2xl p-8 shadow-2xl">
				<h3 class="text-xl font-bold text-white mb-6">Сравнение версий</h3>

				<div class="overflow-x-auto">
					<table class="w-full text-left text-sm">
						<thead>
							<tr class="border-b border-slate-800 text-slate-400">
								<th class="pb-4 font-medium">Характеристика</th>
								<th class="pb-4 font-medium">A100 40GB</th>
								<th class="pb-4 font-medium text-blue-400">A100 80GB</th>
							</tr>
						</thead>
						<tbody class="divide-y divide-slate-800">
							<tr>
								<td class="py-4 text-slate-300">Тип памяти</td>
								<td class="py-4 text-slate-400">HBM2</td>
								<td class="py-4 text-white font-semibold">HBM2e (Быстрее)</td>
							</tr>
							<tr>
								<td class="py-4 text-slate-300">Пропускная способность</td>
								<td class="py-4 text-slate-400">1.5 TB/s</td>
								<td class="py-4 text-white font-semibold">2.0 TB/s</td>
							</tr>
							<tr>
								<td class="py-4 text-slate-300">Max LLM Size (FP16)</td>
								<td class="py-4 text-slate-400">~20B params</td>
								<td class="py-4 text-green-400">~40B params</td>
							</tr>
							<tr>
								<td class="py-4 text-slate-300">Цена / час</td>
								<td class="py-4 text-slate-400">$$</td>
								<td class="py-4 text-white font-semibold">$$$ (Выгоднее)</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
	</div>
</section>

<section class="py-24 bg-slate-900/30 border-t border-slate-800">
	<div class="container mx-auto px-4 md:px-6">
		<div class="text-center mb-16">
			<h2 class="text-3xl font-bold tracking-tight text-white">Оптимальный выбор для</h2>
		</div>

		<div class="grid grid-cols-1 md:grid-cols-3 gap-8">
			{#each useCases as useCase}
				<div
					class="group relative p-8 rounded-2xl border border-slate-800 bg-slate-950 hover:border-blue-500/50 transition-all"
				>
					<div
						class="absolute -inset-px rounded-2xl bg-linear-to-b from-blue-500/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100"
					></div>

					<div class="relative">
						<div
							class="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-slate-900 border border-slate-800 text-blue-400 mb-6"
						>
							<Layers class="h-6 w-6" />
						</div>
						<h3 class="text-xl font-bold text-white mb-3">{useCase.title}</h3>
						<p class="text-slate-400 leading-relaxed">{useCase.desc}</p>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>

<section class="py-24 relative overflow-hidden">
	<div class="absolute inset-0 bg-blue-900/10"></div>
	<div class="container relative z-10 mx-auto px-4 text-center">
		<h2 class="text-3xl md:text-4xl font-bold text-white mb-6">Нужна мощность A100?</h2>
		<p class="text-slate-400 mb-10 max-w-2xl mx-auto">
			Доступны конфигурации 1x, 2x, 4x и 8x GPU. Подключение по InfiniBand для кластеров.
		</p>
		<a
			href={`${appConfig.CONSOLE_URL}/instances/`}
			class="inline-flex h-14 items-center justify-center rounded-lg cursor-pointer bg-brand-600 px-10 text-lg font-bold text-white transition-all hover:bg-brand-500 hover:shadow-lg hover:shadow-brand-500/25"
		>
			Запустить A100
		</a>
	</div>
</section>

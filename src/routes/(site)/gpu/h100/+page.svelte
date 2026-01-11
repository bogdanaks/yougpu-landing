<script lang="ts">
	import { appConfig } from "$shared/config/app-config";
	import {
		Cpu,
		Zap,
		ArrowRight,
		BarChart3,
		Layers,
		CheckCircle2,
		Microchip,
		BrainCircuit,
		Scale
	} from "lucide-svelte";

	// Данные для бенчмарков (относительная производительность)
	const benchmarks = [
		{ name: "LLM Training (GPT-3)", h100: 100, a100: 30, label: "3.5x быстрее" },
		{ name: "Inference (Large Models)", h100: 100, a100: 25, label: "4x быстрее" },
		{ name: "HPC Simulation", h100: 100, a100: 45, label: "2.2x быстрее" }
	];

	const specs = [
		{ label: "Архитектура", value: "NVIDIA Hopper™" },
		{ label: "VRAM", value: "80 GB HBM3" },
		{ label: "Пропускная способность", value: "3.35 TB/s" },
		{ label: "FP8 Tensor Core", value: "3,958 TFLOPS" },
		{ label: "Интерконнект", value: "NVLink 900 GB/s" },
		{ label: "Потребление (TDP)", value: "700W (SXM5)" }
	];

	const useCases = [
		{
			title: "Обучение LLM",
			desc: "Идеально для обучения моделей уровня GPT-4, Llama 3 и Mixture of Experts."
		},
		{
			title: "Генеративный AI",
			desc: "Мгновенная генерация изображений и видео в высоком разрешении (Sora, Stable Diffusion)."
		},
		{
			title: "Научные симуляции",
			desc: "Ускорение геномики, квантовой химии и прогнозирования климата."
		}
	];
</script>

<svelte:head>
	<title>Аренда NVIDIA H100 — YouGPU</title>
	<meta
		name="description"
		content="Арендуйте NVIDIA H100 80GB HBM3 для обучения нейросетей. Поминутная тарификация, мгновенный доступ."
	/>
</svelte:head>

<section class="relative overflow-hidden py-24 md:py-32 bg-slate-950">
	<div aria-hidden="true" class="absolute inset-0 z-0 overflow-hidden pointer-events-none">
		<div
			class="absolute left-[50%] top-0 h-125 w-125 -translate-x-1/2 bg-brand-600/20 blur-[120px] opacity-40"
		></div>
	</div>

	<div class="container relative z-10 mx-auto px-4 md:px-6 text-center">
		<div
			class="inline-flex items-center rounded-full border border-green-500/30 bg-green-500/10 px-3 py-1 text-sm font-medium text-green-400 mb-8 backdrop-blur"
		>
			<Zap class="mr-2 h-4 w-4" />
			<span>Самая мощная AI-видеокарта в мире</span>
		</div>

		<h1
			class="mx-auto max-w-5xl text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-7xl"
		>
			NVIDIA <span class="text-brand-500">H100</span> Tensor Core
		</h1>

		<p class="mx-auto mt-6 max-w-2xl text-lg text-slate-400 md:text-xl">
			Ультимативная производительность для обучения LLM и генеративного ИИ. Архитектура Hopper и
			80GB HBM3 памяти.
		</p>

		<div class="mt-10 flex flex-col items-center justify-center gap-6">
			<div class="flex items-baseline gap-2">
				<span class="text-4xl font-bold text-white">~290 ₽</span>
				<span class="text-slate-500">/ час</span>
			</div>

			<div class="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
				<a
					href={`${appConfig.CONSOLE_URL}/instances/`}
					class="inline-flex h-12 items-center justify-center rounded-md bg-brand-600 px-8 text-base font-semibold text-white transition-all hover:bg-brand-500 hover:shadow-lg hover:shadow-brand-500/25 w-full sm:w-auto"
				>
					Арендовать H100
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
			<Microchip class="h-6 w-6 text-brand-500" />
			<h2 class="text-2xl font-bold text-white">Технические характеристики</h2>
		</div>

		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
			{#each specs as spec}
				<div
					class="p-6 rounded-xl border border-slate-800 bg-slate-950/50 backdrop-blur hover:border-brand-500/30 transition-colors"
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
					<BarChart3 class="h-6 w-6 text-brand-500" />
					<h2 class="text-3xl font-bold text-white">Квантовый скачок производительности</h2>
				</div>
				<p class="text-slate-400 mb-8">
					Сравнение производительности NVIDIA H100 SXM5 против предыдущего поколения A100 80GB в
					реальных задачах.
				</p>

				<div class="space-y-8">
					{#each benchmarks as bench}
						<div>
							<div class="flex justify-between text-sm mb-2">
								<span class="text-white font-medium">{bench.name}</span>
								<span class="text-brand-400 font-bold">{bench.label}</span>
							</div>
							<div
								class="w-full bg-slate-800/50 rounded-full h-10 relative flex flex-col justify-center p-1 gap-1"
							>
								<div
									class="h-3 rounded-full bg-linear-to-r from-brand-600 to-brand-400 relative"
									style="width: {bench.h100}%"
								></div>
								<div
									class="h-3 rounded-full bg-slate-600 relative opacity-60"
									style="width: {bench.a100}%"
								></div>
							</div>
							<div class="flex justify-between text-xs text-slate-500 mt-1 px-1">
								<span>A100</span>
								<span>H100</span>
							</div>
						</div>
					{/each}
				</div>
			</div>

			<div class="bg-slate-950 border border-slate-800 rounded-2xl p-8 shadow-2xl">
				<div class="flex items-center gap-3 mb-6">
					<Scale class="h-6 w-6 text-brand-500" />
					<h3 class="text-xl font-bold text-white">Сравнение поколений</h3>
				</div>

				<div class="overflow-x-auto">
					<table class="w-full text-left text-sm">
						<thead>
							<tr class="border-b border-slate-800 text-slate-400">
								<th class="pb-4 font-medium">Характеристика</th>
								<th class="pb-4 font-medium">NVIDIA A100</th>
								<th class="pb-4 font-medium text-brand-400">NVIDIA H100</th>
							</tr>
						</thead>
						<tbody class="divide-y divide-slate-800">
							<tr>
								<td class="py-4 text-slate-300">Архитектура</td>
								<td class="py-4 text-slate-400">Ampere</td>
								<td class="py-4 text-white font-semibold">Hopper</td>
							</tr>
							<tr>
								<td class="py-4 text-slate-300">FP16 (Tensor)</td>
								<td class="py-4 text-slate-400">312 TFLOPS</td>
								<td class="py-4 text-white font-semibold">1,979 TFLOPS</td>
							</tr>
							<tr>
								<td class="py-4 text-slate-300">Memory Bandwidth</td>
								<td class="py-4 text-slate-400">2.0 TB/s</td>
								<td class="py-4 text-white font-semibold">3.35 TB/s</td>
							</tr>
							<tr>
								<td class="py-4 text-slate-300">Трансформер Engine</td>
								<td class="py-4 text-slate-400 text-xs">Нет</td>
								<td class="py-4 text-green-400 text-xs">Есть (FP8)</td>
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
			<h2 class="text-3xl font-bold tracking-tight text-white">Для каких задач?</h2>
			<p class="mt-4 text-slate-400">H100 создан для самых требовательных рабочих нагрузок.</p>
		</div>

		<div class="grid grid-cols-1 md:grid-cols-3 gap-8">
			{#each useCases as useCase}
				<div
					class="group relative p-8 rounded-2xl border border-slate-800 bg-slate-950 hover:border-brand-500/50 transition-all"
				>
					<div
						class="absolute -inset-px rounded-2xl bg-linear-to-b from-brand-500/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100"
					></div>

					<div class="relative">
						<div
							class="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-slate-900 border border-slate-800 text-brand-400 mb-6"
						>
							{#if useCase.title.includes("LLM")}
								<BrainCircuit class="h-6 w-6" />
							{:else if useCase.title.includes("Генеративный")}
								<Layers class="h-6 w-6" />
							{:else}
								<Cpu class="h-6 w-6" />
							{/if}
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
	<div class="absolute inset-0 bg-brand-900/10"></div>
	<div class="container relative z-10 mx-auto px-4 text-center">
		<h2 class="text-3xl md:text-4xl font-bold text-white mb-6">Готовы запустить H100?</h2>
		<p class="text-slate-400 mb-10 max-w-2xl mx-auto">
			Разверните свой инстанс H100 за пару минут. Без долгосрочных контрактов.
		</p>
		<a
			href={`${appConfig.CONSOLE_URL}/instances/`}
			class="inline-flex h-14 items-center justify-center rounded-lg cursor-pointer bg-brand-600 px-10 text-lg font-bold text-white transition-all hover:bg-brand-500 hover:shadow-lg hover:shadow-brand-500/25"
		>
			Запустить H100
		</a>
	</div>
</section>

<script lang="ts">
	import { appConfig } from "$shared/config/app-config";
	import {
		Cpu,
		Zap,
		ArrowRight,
		TrendingUp,
		Workflow,
		Microchip,
		Rocket,
		CheckCircle
	} from "lucide-svelte";

	// Бенчмарки: Сравниваем H200 с H100 (предыдущим королем)
	const benchmarks = [
		{ name: "Llama 3 70B Inference", h200: 100, h100: 55, label: "1.9x быстрее" },
		{ name: "GPT-3 175B Inference", h200: 100, h100: 60, label: "1.6x быстрее" },
		{ name: "HPC (Simulation)", h200: 100, h100: 90, label: "1.1x быстрее" }
	];

	const specs = [
		{ label: "Архитектура", value: "NVIDIA Hopper™" },
		{ label: "VRAM", value: "141 GB HBM3e" }, // Главная фишка
		{ label: "Пропускная способность", value: "4.8 TB/s" }, // Главная фишка
		{ label: "FP8 Tensor Core", value: "3,958 TFLOPS" },
		{ label: "Интерконнект", value: "NVLink 900 GB/s" },
		{ label: "Потребление (TDP)", value: "700W (SXM5)" }
	];

	const useCases = [
		{
			title: "LLM Inference",
			desc: "Запуск моделей 70B+ параметров с максимальной скоростью токенов в секунду (TPS). Убийца задержек."
		},
		{
			title: "MoE (Mixture of Experts)",
			desc: "Идеально подходит для моделей типа Mixtral и Grok, требующих огромного объема быстрой памяти."
		},
		{
			title: "Hybrid Training",
			desc: "Обучение моделей, которые не помещаются в память H100, без необходимости разбиения на большее кол-во GPU."
		}
	];
</script>

<svelte:head>
	<title>Аренда NVIDIA H200 141GB — YouGPU</title>
	<meta
		name="description"
		content="Арендуйте NVIDIA H200 с памятью HBM3e. Самый быстрый GPU для инференса Llama 3 и GPT. Доступен поминутно."
	/>
</svelte:head>

<section class="relative overflow-hidden py-24 md:py-32 bg-slate-950">
	<div aria-hidden="true" class="absolute inset-0 z-0 overflow-hidden pointer-events-none">
		<div
			class="absolute left-[50%] -top-25 h-150 w-150 -translate-x-1/2 bg-amber-500/10 blur-[120px] opacity-50"
		></div>
		<div class="absolute right-[10%] bottom-0 h-75 w-75 bg-brand-600/10 blur-[100px]"></div>
	</div>

	<div class="container relative z-10 mx-auto px-4 md:px-6 text-center">
		<div
			class="inline-flex items-center rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-sm font-medium text-amber-400 mb-8 backdrop-blur"
		>
			<Rocket class="mr-2 h-4 w-4" />
			<span>Самая быстрая память в мире</span>
		</div>

		<h1
			class="mx-auto max-w-5xl text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-7xl"
		>
			NVIDIA <span class="bg-linear-to-r from-brand-400 to-amber-400 bg-clip-text text-transparent"
				>H200</span
			> Tensor Core
		</h1>

		<p class="mx-auto mt-6 max-w-2xl text-lg text-slate-400 md:text-xl">
			Первый GPU с памятью <strong>HBM3e</strong>. 141 ГБ сверхбыстрой памяти для мгновенного
			инференса самых больших языковых моделей.
		</p>

		<div class="mt-10 flex flex-col items-center justify-center gap-6">
			<div class="flex items-baseline gap-2">
				<span class="text-4xl font-bold text-white">~380 ₽</span>
				<span class="text-slate-500">/ час</span>
			</div>

			<div class="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
				<a
					href={`${appConfig.CONSOLE_URL}/instances/`}
					class="inline-flex h-12 items-center justify-center rounded-md bg-brand-600 px-8 text-base font-semibold text-white transition-all hover:bg-brand-500 hover:shadow-lg hover:shadow-brand-500/25 w-full sm:w-auto"
				>
					Арендовать H200
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
			<Microchip class="h-6 w-6 text-amber-500" />
			<h2 class="text-2xl font-bold text-white">Рекордные характеристики</h2>
		</div>

		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
			{#each specs as spec}
				<div
					class="group p-6 rounded-xl border border-slate-800 bg-slate-950/50 backdrop-blur hover:border-amber-500/30 transition-all"
				>
					<div class="text-sm text-slate-500 mb-1">{spec.label}</div>
					<div class="text-xl font-semibold text-white flex items-center gap-2">
						{spec.value}
						{#if spec.label.includes("VRAM") || spec.label.includes("Пропускная")}
							<span
								class="inline-flex items-center rounded-full bg-amber-500/10 px-2 py-0.5 text-xs font-medium text-amber-500"
							>
								TOP
							</span>
						{/if}
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>

<section id="comparison" class="py-24 relative">
	<div class="container mx-auto px-4 md:px-6">
		<div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
			<div>
				<div class="flex items-center gap-3 mb-8">
					<TrendingUp class="h-6 w-6 text-brand-500" />
					<h2 class="text-3xl font-bold text-white">Больше памяти = Быстрее вывод</h2>
				</div>
				<p class="text-slate-400 mb-8 text-lg">
					В задачах генеративного ИИ "бутылочным горлышком" часто является память, а не вычисления.
					H200 решает эту проблему благодаря памяти HBM3e.
				</p>

				<div class="space-y-6">
					{#each benchmarks as bench}
						<div>
							<div class="flex justify-between text-sm mb-2">
								<span class="text-white font-medium">{bench.name}</span>
								<span class="text-brand-400 font-bold">{bench.label}</span>
							</div>
							<div
								class="w-full bg-slate-800/50 rounded-full h-8 relative flex flex-col justify-center p-1 gap-1"
							>
								<div
									class="h-full rounded-full bg-linear-to-r from-amber-500 to-brand-500 relative z-10"
									style="width: {bench.h200}%"
								>
									<span
										class="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] font-bold text-black px-1"
										>H200</span
									>
								</div>
								<div
									class="absolute top-1 left-1 bottom-1 bg-slate-600/50 rounded-full border-r border-white/20"
									style="width: {bench.h100}%"
								>
									<span
										class="hidden sm:block absolute right-2 top-1/2 -translate-y-1/2 text-[10px] text-slate-300"
										>H100</span
									>
								</div>
							</div>
						</div>
					{/each}
				</div>
			</div>

			<div
				class="bg-slate-950 border border-slate-800 rounded-2xl p-8 shadow-2xl relative overflow-hidden"
			>
				<div
					class="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-amber-500/10 blur-[50px] rounded-full"
				></div>

				<div class="flex items-center justify-between mb-6 relative z-10">
					<h3 class="text-xl font-bold text-white">H100 vs H200</h3>
					<span
						class="text-xs text-slate-500 bg-slate-900 px-2 py-1 rounded border border-slate-800"
						>SXM5 Form Factor</span
					>
				</div>

				<div class="overflow-x-auto relative z-10">
					<table class="w-full text-left text-sm">
						<thead>
							<tr class="border-b border-slate-800 text-slate-400">
								<th class="pb-4 font-medium">Спецификация</th>
								<th class="pb-4 font-medium">NVIDIA H100</th>
								<th class="pb-4 font-medium text-amber-400">NVIDIA H200</th>
							</tr>
						</thead>
						<tbody class="divide-y divide-slate-800">
							<tr>
								<td class="py-4 text-slate-300">Тип Памяти</td>
								<td class="py-4 text-slate-400">HBM3</td>
								<td class="py-4 text-white font-bold">HBM3e (New)</td>
							</tr>
							<tr>
								<td class="py-4 text-slate-300">Объем Памяти</td>
								<td class="py-4 text-slate-400">80 GB</td>
								<td class="py-4 text-amber-400 font-bold text-lg">141 GB</td>
							</tr>
							<tr>
								<td class="py-4 text-slate-300">Bandwidth</td>
								<td class="py-4 text-slate-400">3.35 TB/s</td>
								<td class="py-4 text-white font-bold">4.8 TB/s</td>
							</tr>
							<tr>
								<td class="py-4 text-slate-300">Llama 70B Inference</td>
								<td class="py-4 text-slate-400">1x Speed</td>
								<td class="py-4 text-green-400 font-bold">1.9x Speed</td>
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
			<h2 class="text-3xl font-bold tracking-tight text-white">Game Changer для LLM</h2>
			<p class="mt-4 text-slate-400">Когда производительность H100 уже недостаточна.</p>
		</div>

		<div class="grid grid-cols-1 md:grid-cols-3 gap-8">
			{#each useCases as useCase}
				<div
					class="group relative p-8 rounded-2xl border border-slate-800 bg-slate-950 hover:border-amber-500/50 transition-all"
				>
					<div
						class="absolute -inset-px rounded-2xl bg-linear-to-b from-amber-500/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100"
					></div>

					<div class="relative">
						<div
							class="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-slate-900 border border-slate-800 text-amber-500 mb-6"
						>
							{#if useCase.title.includes("Inference")}
								<Workflow class="h-6 w-6" />
							{:else if useCase.title.includes("MoE")}
								<Cpu class="h-6 w-6" />
							{:else}
								<Zap class="h-6 w-6" />
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
	<div class="absolute inset-0 bg-linear-to-t from-slate-950 to-slate-900"></div>
	<div class="container relative z-10 mx-auto px-4 text-center">
		<h2 class="text-3xl md:text-4xl font-bold text-white mb-6">Готовы запустить H200?</h2>
		<p class="text-slate-400 mb-10 max-w-2xl mx-auto">
			Ограниченное количество инстансов. Высокий спрос. Разверните свой H200 прямо сейчас.
		</p>
		<div class="flex flex-col sm:flex-row items-center justify-center gap-4">
			<a
				href={`${appConfig.CONSOLE_URL}/instances/`}
				class="inline-flex h-14 items-center justify-center rounded-lg cursor-pointer bg-brand-600 px-10 text-lg font-bold text-white transition-all hover:bg-brand-500 hover:shadow-lg hover:shadow-brand-500/25"
			>
				Запустить H200
			</a>
		</div>
	</div>
</section>

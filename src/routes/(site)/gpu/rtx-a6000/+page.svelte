<script lang="ts">
	import { appConfig } from "$shared/config/app-config";
	import {
		Monitor,
		Zap,
		ArrowRight,
		Coins,
		Maximize,
		CheckCircle2,
		Briefcase,
		Image
	} from "lucide-svelte";

	// Бенчмарки: Фокус на объеме памяти по сравнению с игровыми картами
	const benchmarks = [
		{ name: "Max Scene Size (VRAM Limit)", a6000: 100, rtx3090: 50, label: "48GB vs 24GB" },
		{
			name: "Stable Diffusion Batch Size",
			a6000: 100,
			rtx3090: 55,
			label: "2x больше картинок за раз"
		},
		{ name: "Cost Efficiency (Price/VRAM)", a6000: 90, ada: 60, label: "Выгоднее, чем Ada" }
	];

	const specs = [
		{ label: "Архитектура", value: "NVIDIA Ampere" },
		{ label: "VRAM", value: "48 GB GDDR6" }, // Главное преимущество
		{ label: "CUDA Cores", value: "10,752" },
		{ label: "RT Cores", value: "2nd Gen (84)" },
		{ label: "Пропускная способность", value: "768 GB/s" },
		{ label: "NVLink", value: "Поддерживается (2-way)" } // Важный плюс, которого нет у 4090/6000 Ada
	];

	const useCases = [
		{
			title: "Budget Large Scale Rendering",
			desc: "Рендеринг тяжелых сцен в Octane/Redshift, которые требуют больше 24GB памяти, но бюджет ограничен."
		},
		{
			title: "LLM Fine-tuning (QLoRA)",
			desc: "Отличный выбор для дообучения моделей 7B-30B параметров. 48GB позволяют брать большие batch sizes."
		},
		{
			title: "Multi-GPU Workstations",
			desc: "Поддержка NVLink позволяет объединить две карты и получить 96GB памяти для огромных задач."
		}
	];
</script>

<svelte:head>
	<title>Аренда NVIDIA RTX A6000 48GB — YouGPU</title>
	<meta
		name="description"
		content="Аренда NVIDIA RTX A6000. Самый доступный способ получить 48GB видеопамяти для рендеринга и нейросетей."
	/>
</svelte:head>

<section class="relative overflow-hidden py-24 md:py-32 bg-slate-950">
	<div aria-hidden="true" class="absolute inset-0 z-0 overflow-hidden pointer-events-none">
		<div
			class="absolute right-[20%] bottom-[-10%] h-125 w-125 bg-teal-600/20 blur-[120px] opacity-40"
		></div>
		<div class="absolute left-10 top-20 h-75 w-75 bg-emerald-600/10 blur-[100px]"></div>
	</div>

	<div class="container relative z-10 mx-auto px-4 md:px-6 text-center">
		<div
			class="inline-flex items-center rounded-full border border-teal-500/30 bg-teal-500/10 px-3 py-1 text-sm font-medium text-teal-400 mb-8 backdrop-blur"
		>
			<Coins class="mr-2 h-4 w-4" />
			<span>Лучшее соотношение Цена / VRAM</span>
		</div>

		<h1
			class="mx-auto max-w-5xl text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-7xl"
		>
			NVIDIA <span class="text-teal-400">RTX A6000</span>
		</h1>

		<p class="mx-auto mt-6 max-w-2xl text-lg text-slate-400 md:text-xl">
			Рабочая лошадка индустрии. Те же <strong>48 ГБ памяти</strong>, что и у флагманов, но по
			значительно более доступной цене. Идеальный вход в мир больших вычислений.
		</p>

		<div class="mt-10 flex flex-col items-center justify-center gap-6">
			<div class="flex items-baseline gap-2">
				<span class="text-4xl font-bold text-white">~75 ₽</span>
				<span class="text-slate-500">/ час</span>
			</div>

			<div class="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
				<a
					href={`${appConfig.CONSOLE_URL}/instances/`}
					class="inline-flex h-12 items-center justify-center rounded-md bg-teal-600 px-8 text-base font-semibold text-white transition-all hover:bg-teal-500 hover:shadow-lg hover:shadow-teal-500/25 w-full sm:w-auto"
				>
					Арендовать A6000
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
			<Briefcase class="h-6 w-6 text-teal-500" />
			<h2 class="text-2xl font-bold text-white">Профессиональные характеристики</h2>
		</div>

		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
			{#each specs as spec}
				<div
					class="group p-6 rounded-xl border border-slate-800 bg-slate-950/50 backdrop-blur hover:border-teal-500/30 transition-colors"
				>
					<div class="text-sm text-slate-500 mb-1">{spec.label}</div>
					<div class="text-xl font-semibold text-white">{spec.value}</div>
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
					<Maximize class="h-6 w-6 text-teal-500" />
					<h2 class="text-3xl font-bold text-white">48 GB меняют всё</h2>
				</div>
				<p class="text-slate-400 mb-8 text-lg">
					Главная проблема потребительских карт (RTX 3090/4090) — ограничение в 24 GB памяти. RTX
					A6000 удваивает этот объем, позволяя работать со сценами и моделями, которые раньше
					вызывали ошибки "Out of Memory".
				</p>

				<div class="space-y-6">
					{#each benchmarks as bench}
						<div>
							<div class="flex justify-between text-sm mb-2">
								<span class="text-white font-medium">{bench.name}</span>
								<span class="text-teal-400 font-bold">{bench.label}</span>
							</div>
							<div
								class="w-full bg-slate-800/50 rounded-full h-8 relative flex flex-col justify-center p-1 gap-1"
							>
								<div
									class="h-full rounded-full bg-linear-to-r from-teal-600 to-emerald-500 relative z-10"
									style="width: {bench.a6000}%"
								>
									<span
										class="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] font-bold text-black px-1"
										>A6000</span
									>
								</div>
								<div
									class="absolute top-1 left-1 bottom-1 bg-slate-600/50 rounded-full border-r border-white/20"
									style="width: {bench.rtx3090 || bench.ada}%"
								>
									<span
										class="hidden sm:block absolute right-2 top-1/2 -translate-y-1/2 text-[10px] text-slate-300"
									>
										{bench.name.includes("Ada") ? "Ada" : "RTX 3090"}
									</span>
								</div>
							</div>
						</div>
					{/each}
				</div>
			</div>

			<div class="bg-slate-950 border border-slate-800 rounded-2xl p-8 shadow-2xl">
				<h3 class="text-xl font-bold text-white mb-6">Битва поколений</h3>

				<div class="overflow-x-auto">
					<table class="w-full text-left text-sm">
						<thead>
							<tr class="border-b border-slate-800 text-slate-400">
								<th class="pb-4 font-medium">Модель</th>
								<th class="pb-4 font-medium">VRAM</th>
								<th class="pb-4 font-medium">NVLink</th>
								<th class="pb-4 font-medium text-right">Цена/час</th>
							</tr>
						</thead>
						<tbody class="divide-y divide-slate-800">
							<tr>
								<td class="py-4 text-slate-300 font-medium">RTX 3090 / 4090</td>
								<td class="py-4 text-slate-400">24 GB</td>
								<td class="py-4 text-red-400 text-xs">Нет (у 4090)</td>
								<td class="py-4 text-white text-right">$$</td>
							</tr>
							<tr class="bg-teal-500/5">
								<td class="py-4 text-teal-300 font-bold flex items-center gap-2">
									RTX A6000
									<CheckCircle2 class="h-3 w-3" />
								</td>
								<td class="py-4 text-teal-400 font-bold">48 GB</td>
								<td class="py-4 text-green-400 text-xs">Есть (2-way)</td>
								<td class="py-4 text-white font-bold text-right">$$</td>
							</tr>
							<tr>
								<td class="py-4 text-slate-300 font-medium">RTX 6000 Ada</td>
								<td class="py-4 text-slate-400">48 GB</td>
								<td class="py-4 text-red-400 text-xs">Нет</td>
								<td class="py-4 text-white text-right">$$$$</td>
							</tr>
						</tbody>
					</table>
				</div>
				<p class="mt-4 text-xs text-slate-500">
					*NVLink позволяет объединять память двух карт A6000 в единый пул 96GB, чего лишена
					архитектура Ada.
				</p>
			</div>
		</div>
	</div>
</section>

<section class="py-24 bg-slate-900/30 border-t border-slate-800">
	<div class="container mx-auto px-4 md:px-6">
		<div class="text-center mb-16">
			<h2 class="text-3xl font-bold tracking-tight text-white">Идеально подходит для</h2>
		</div>

		<div class="grid grid-cols-1 md:grid-cols-3 gap-8">
			{#each useCases as useCase}
				<div
					class="group relative p-8 rounded-2xl border border-slate-800 bg-slate-950 hover:border-teal-500/50 transition-all"
				>
					<div
						class="absolute -inset-px rounded-2xl bg-linear-to-b from-teal-500/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100"
					></div>

					<div class="relative">
						<div
							class="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-slate-900 border border-slate-800 text-teal-500 mb-6"
						>
							{#if useCase.title.includes("Rendering")}
								<Image class="h-6 w-6" />
							{:else if useCase.title.includes("Budget")}
								<Coins class="h-6 w-6" />
							{:else}
								<Monitor class="h-6 w-6" />
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
	<div class="absolute inset-0 bg-teal-900/10"></div>
	<div class="container relative z-10 mx-auto px-4 text-center">
		<h2 class="text-3xl md:text-4xl font-bold text-white mb-6">Нужно много памяти недорого?</h2>
		<p class="text-slate-400 mb-10 max-w-2xl mx-auto">
			RTX A6000 — это самый умный выбор для тех, кто умеет считать деньги и гигабайты.
		</p>
		<a
			href={`${appConfig.CONSOLE_URL}/instances/`}
			class="inline-flex h-14 items-center justify-center rounded-lg cursor-pointer bg-brand-600 px-10 text-lg font-bold text-white transition-all hover:bg-brand-500 hover:shadow-lg hover:shadow-brand-500/25"
		>
			Запустить RTX A6000
		</a>
	</div>
</section>

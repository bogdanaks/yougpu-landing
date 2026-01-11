<script lang="ts">
	import { appConfig } from "$shared/config/app-config";
	import { MonitorPlay, Zap, ArrowRight, Brush, Box, Check, Cpu, Palette } from "lucide-svelte";

	// Бенчмарки: Сравниваем с предыдущим поколением (RTX A6000) и "геймерским" флагманом (RTX 4090)
	const benchmarks = [
		{ name: "Omniverse Rendering", ada: 100, prev: 50, label: "2.1x быстрее RTX A6000" },
		{ name: "Generative AI (Stable Diffusion)", ada: 100, prev: 60, label: "1.7x быстрее" },
		{ name: "VRAM Capacity vs 4090", ada: 100, prev: 50, label: "2x больше памяти (48GB)" }
	];

	const specs = [
		{ label: "Архитектура", value: "Ada Lovelace" },
		{ label: "VRAM", value: "48 GB GDDR6" }, // Ключевое отличие от 4090
		{ label: "CUDA Cores", value: "18,176" },
		{ label: "RT Cores", value: "3rd Gen (142)" },
		{ label: "Потребление (TDP)", value: "300W" }, // Энергоэффективность
		{ label: "ECC Memory", value: "Да (Error Correction)" } // Важно для профи
	];

	const useCases = [
		{
			title: "3D Rendering & Ray Tracing",
			desc: "Максимальная производительность в Redshift, Octane и V-Ray. Работа со сценами, которые не влезают в 24GB."
		},
		{
			title: "Generative AI Art",
			desc: 'Генерация изображений в огромном разрешении и обучение LoRA/Dreambooth без ошибок "Out of Memory".'
		},
		{
			title: "Workstation AI",
			desc: "Локальный запуск LLM (Llama-3 70B int4) и задач Data Science с поддержкой ECC."
		}
	];
</script>

<svelte:head>
	<title>Аренда NVIDIA RTX 6000 Ada — YouGPU</title>
	<meta
		name="description"
		content="Аренда рабочей станции с NVIDIA RTX 6000 Ada Generation. 48GB VRAM для рендеринга и AI. Доступно поминутно."
	/>
</svelte:head>

<section class="relative overflow-hidden py-24 md:py-32 bg-slate-950">
	<div aria-hidden="true" class="absolute inset-0 z-0 overflow-hidden pointer-events-none">
		<div
			class="absolute left-[20%] top-[-20%] h-150 w-150 bg-cyan-500/20 blur-[120px] opacity-40"
		></div>
		<div class="absolute right-0 bottom-0 h-75 w-75 bg-sky-600/10 blur-[100px]"></div>
	</div>

	<div class="container relative z-10 mx-auto px-4 md:px-6 text-center">
		<div
			class="inline-flex items-center rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-sm font-medium text-cyan-400 mb-8 backdrop-blur"
		>
			<Brush class="mr-2 h-4 w-4" />
			<span>Лучший GPU для визуализации и графики</span>
		</div>

		<h1
			class="mx-auto max-w-5xl text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-7xl"
		>
			NVIDIA <span class="text-cyan-400">RTX 6000</span> Ada Generation
		</h1>

		<p class="mx-auto mt-6 max-w-2xl text-lg text-slate-400 md:text-xl">
			Ультимативная видеокарта для профессионалов. Архитектура Ada Lovelace и
			<strong>48 ГБ памяти</strong> для самых сложных сцен и нейросетей.
		</p>

		<div class="mt-10 flex flex-col items-center justify-center gap-6">
			<div class="flex items-baseline gap-2">
				<span class="text-4xl font-bold text-white">~95 ₽</span>
				<span class="text-slate-500">/ час</span>
			</div>

			<div class="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
				<a
					href={`${appConfig.CONSOLE_URL}/instances/`}
					class="inline-flex h-12 items-center justify-center rounded-md bg-cyan-600 px-8 text-base font-semibold text-white transition-all hover:bg-cyan-500 hover:shadow-lg hover:shadow-cyan-500/25 w-full sm:w-auto"
				>
					Арендовать RTX 6000 Ada
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
			<MonitorPlay class="h-6 w-6 text-cyan-500" />
			<h2 class="text-2xl font-bold text-white">Спецификации рабочей станции</h2>
		</div>

		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
			{#each specs as spec}
				<div
					class="group p-6 rounded-xl border border-slate-800 bg-slate-950/50 backdrop-blur hover:border-cyan-500/30 transition-colors"
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
					<Box class="h-6 w-6 text-cyan-500" />
					<h2 class="text-3xl font-bold text-white">Почему не RTX 4090?</h2>
				</div>
				<p class="text-slate-400 mb-8 text-lg">
					RTX 4090 — отличная карта, но RTX 6000 Ada создана для профессиональных нагрузок, где 24GB
					памяти уже недостаточно.
				</p>

				<ul class="space-y-5">
					<li class="flex items-start gap-4">
						<div class="mt-1 shrink-0 rounded-full bg-cyan-500/10 p-1 text-cyan-400">
							<Check class="h-5 w-5" />
						</div>
						<div>
							<h4 class="font-bold text-white">48 GB VRAM</h4>
							<p class="text-sm text-slate-400">
								Работайте с огромными 3D-сценами и обучайте модели без вылетов по памяти.
							</p>
						</div>
					</li>
					<li class="flex items-start gap-4">
						<div class="mt-1 shrink-0 rounded-full bg-cyan-500/10 p-1 text-cyan-400">
							<Check class="h-5 w-5" />
						</div>
						<div>
							<h4 class="font-bold text-white">Стабильность и ECC</h4>
							<p class="text-sm text-slate-400">
								Память с коррекцией ошибок предотвращает сбои при длительных рендерах.
							</p>
						</div>
					</li>
					<li class="flex items-start gap-4">
						<div class="mt-1 shrink-0 rounded-full bg-cyan-500/10 p-1 text-cyan-400">
							<Check class="h-5 w-5" />
						</div>
						<div>
							<h4 class="font-bold text-white">Энергоэффективность</h4>
							<p class="text-sm text-slate-400">
								Потребляет всего 300W против 450W+ у 4090 при схожей производительности.
							</p>
						</div>
					</li>
				</ul>
			</div>

			<div class="bg-slate-950 border border-slate-800 rounded-2xl p-8 shadow-2xl">
				<h3 class="text-xl font-bold text-white mb-6">Прирост производительности</h3>

				<div class="space-y-8">
					{#each benchmarks as bench}
						<div>
							<div class="flex justify-between text-sm mb-2">
								<span class="text-white font-medium">{bench.name}</span>
								<span class="text-cyan-400 font-bold">{bench.label}</span>
							</div>
							<div
								class="w-full bg-slate-800/50 rounded-full h-8 relative flex flex-col justify-center p-1 gap-1"
							>
								<div
									class="h-full rounded-full bg-linear-to-r from-cyan-600 to-sky-400 relative z-10"
									style="width: {bench.ada}%"
								>
									<span
										class="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] font-bold text-black px-1"
										>Ada</span
									>
								</div>
								<div
									class="absolute top-1 left-1 bottom-1 bg-slate-600/50 rounded-full border-r border-white/20"
									style="width: {bench.prev}%"
								>
									<span
										class="hidden sm:block absolute right-2 top-1/2 -translate-y-1/2 text-[10px] text-slate-300"
									>
										{bench.name.includes("4090") ? "RTX 4090" : "RTX A6000"}
									</span>
								</div>
							</div>
						</div>
					{/each}
				</div>
				[Image of NVIDIA RTX 6000 Ada Generation GPU card design]
			</div>
		</div>
	</div>
</section>

<section class="py-24 bg-slate-900/30 border-t border-slate-800">
	<div class="container mx-auto px-4 md:px-6">
		<div class="text-center mb-16">
			<h2 class="text-3xl font-bold tracking-tight text-white">Создан для Творцов</h2>
			<p class="mt-4 text-slate-400">
				Идеальный баланс между вычислительной мощностью и объемом памяти.
			</p>
		</div>

		<div class="grid grid-cols-1 md:grid-cols-3 gap-8">
			{#each useCases as useCase}
				<div
					class="group relative p-8 rounded-2xl border border-slate-800 bg-slate-950 hover:border-cyan-500/50 transition-all"
				>
					<div
						class="absolute -inset-px rounded-2xl bg-linear-to-b from-cyan-500/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100"
					></div>

					<div class="relative">
						<div
							class="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-slate-900 border border-slate-800 text-cyan-400 mb-6"
						>
							{#if useCase.title.includes("Rendering")}
								<Palette class="h-6 w-6" />
							{:else if useCase.title.includes("Art")}
								<Brush class="h-6 w-6" />
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
	<div class="absolute inset-0 bg-cyan-900/10"></div>
	<div class="container relative z-10 mx-auto px-4 text-center">
		<h2 class="text-3xl md:text-4xl font-bold text-white mb-6">Ускорьте свой пайплайн</h2>
		<p class="text-slate-400 mb-10 max-w-2xl mx-auto">
			Арендуйте мощь рабочей станции в облаке. Никакого шума, никаких затрат на железо.
		</p>
		<a
			href={`${appConfig.CONSOLE_URL}/instances/`}
			class="inline-flex h-14 items-center justify-center rounded-lg cursor-pointer bg-brand-600 px-10 text-lg font-bold text-white transition-all hover:bg-brand-500 hover:shadow-lg hover:shadow-brand-500/25"
		>
			Запустить RTX 6000 Ada
		</a>
	</div>
</section>

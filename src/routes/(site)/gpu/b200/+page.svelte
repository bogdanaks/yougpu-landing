<script lang="ts">
	import { appConfig } from "$shared/config/app-config";
	import {
		Cpu,
		Zap,
		ArrowRight,
		Trophy,
		Network,
		Microchip,
		Infinity,
		Atom,
		Lock
	} from "lucide-svelte";

	// Бенчмарки: Сравниваем B200 с H100. Цифры здесь колоссальные (до 30x в инференсе MoE)
	const benchmarks = [
		{ name: "GPT-MoE Inference (1.8T params)", b200: 100, h100: 4, label: "30x быстрее" }, // 30x claim
		{ name: "LLM Training Speed", b200: 100, h100: 25, label: "4x быстрее" },
		{ name: "Energy Efficiency", b200: 100, h100: 5, label: "25x эффективнее" }
	];

	const specs = [
		{ label: "Архитектура", value: "NVIDIA Blackwell" },
		{ label: "VRAM", value: "192 GB HBM3e" }, // Объем
		{ label: "Пропускная способность", value: "8.0 TB/s" }, // Скорость памяти
		{ label: "AI Performance (FP4)", value: "20 PetaFLOPS" }, // Новый формат FP4
		{ label: "NVLink Switch", value: "1.8 TB/s (Bi-dir)" },
		{ label: "Транзисторов", value: "208 Миллиардов" }
	];

	const useCases = [
		{
			title: "Trillion-Parameter Models",
			desc: "Обучение и запуск моделей масштаба GPT-5 и выше в реальном времени."
		},
		{
			title: "Real-Time Generative AI",
			desc: "Генерация контента для метавселенных и видеопотоков без задержек."
		},
		{
			title: "Digital Twins",
			desc: "Симуляция целых физических систем и заводов с идеальной точностью."
		}
	];
</script>

<svelte:head>
	<title>Аренда NVIDIA B200 Blackwell — YouGPU</title>
	<meta
		name="description"
		content="Предзаказ и аренда NVIDIA B200 (Blackwell). 20 PetaFLOPS FP4 производительности. Новая эра искусственного интеллекта."
	/>
</svelte:head>

<section class="relative overflow-hidden py-24 md:py-32 bg-slate-950">
	<div aria-hidden="true" class="absolute inset-0 z-0 overflow-hidden pointer-events-none">
		<div
			class="absolute left-[50%] top-[-10%] h-200 w-200 -translate-x-1/2 bg-indigo-600/20 blur-[130px] opacity-60"
		></div>
		<div class="absolute right-0 bottom-0 h-100 w-100 bg-purple-600/10 blur-[100px]"></div>
	</div>

	<div class="container relative z-10 mx-auto px-4 md:px-6 text-center">
		<div
			class="inline-flex items-center rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 text-sm font-medium text-indigo-300 mb-8 backdrop-blur"
		>
			<Infinity class="mr-2 h-4 w-4" />
			<span>Новая индустриальная революция</span>
		</div>

		<h1
			class="mx-auto max-w-6xl text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-7xl"
		>
			NVIDIA <span
				class="bg-linear-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
				>B200</span
			> Blackwell
		</h1>

		<p class="mx-auto mt-6 max-w-3xl text-lg text-slate-400 md:text-xl">
			Самый мощный чип в истории. <strong>208 миллиардов транзисторов.</strong>
			Производительность уровня дата-центра в одном GPU. Поддержка вычислений FP4 для ИИ.
		</p>

		<div class="mt-10 flex flex-col items-center justify-center gap-6">
			<div class="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
				<a
					href={`${appConfig.CONSOLE_URL}/instances/`}
					class="inline-flex h-12 items-center justify-center rounded-md bg-indigo-600 px-8 text-base font-semibold text-white transition-all hover:bg-indigo-500 hover:shadow-[0_0_30px_-5px_rgba(79,70,229,0.5)] w-full sm:w-auto"
				>
					Арендовать B200
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
			<Atom class="h-6 w-6 text-indigo-500" />
			<h2 class="text-2xl font-bold text-white">Монструозные характеристики</h2>
		</div>

		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
			{#each specs as spec}
				<div
					class="group relative p-6 rounded-xl border border-slate-800 bg-slate-950 overflow-hidden hover:border-indigo-500/50 transition-all duration-300"
				>
					<div
						class="absolute -right-10 -top-10 w-24 h-24 bg-indigo-600/20 blur-2xl group-hover:bg-indigo-600/40 transition-all"
					></div>

					<div class="relative z-10">
						<div class="text-sm text-slate-500 mb-1">{spec.label}</div>
						<div class="text-xl md:text-2xl font-bold text-white tracking-tight">
							{spec.value}
						</div>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>

<section class="py-24 relative overflow-hidden">
	<div class="container mx-auto px-4 md:px-6 relative z-10">
		<div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
			<div>
				<div class="flex items-center gap-3 mb-8">
					<Trophy class="h-6 w-6 text-indigo-500" />
					<h2 class="text-3xl font-bold text-white">Квантовый скачок (x30)</h2>
				</div>
				<p class="text-slate-400 mb-8 text-lg">
					Архитектура Blackwell внедряет поддержку формата <strong>FP4</strong> (4-битная плавающая запятая).
					Это позволяет удвоить пропускную способность по сравнению с FP8, сохраняя точность для большинства
					задач инференса.
				</p>

				<div class="space-y-8">
					{#each benchmarks as bench}
						<div>
							<div class="flex justify-between text-sm mb-2">
								<span class="text-white font-medium">{bench.name}</span>
								<span class="text-indigo-400 font-bold">{bench.label}</span>
							</div>
							<div class="w-full bg-slate-800/30 rounded-full h-2">
								<div
									class="h-2 rounded-full bg-linear-to-r from-indigo-600 to-purple-500 relative shadow-[0_0_10px_rgba(99,102,241,0.5)]"
									style="width: {bench.b200}%"
								></div>
							</div>
							<div class="mt-1 flex items-center gap-2">
								<div
									class="h-1.5 rounded-full bg-slate-600 w-[{bench.h100}%]"
									style="width: {bench.h100}%"
								></div>
								<span class="text-[10px] text-slate-500 uppercase tracking-wider">H100</span>
							</div>
						</div>
					{/each}
				</div>
			</div>

			<div class="relative">
				<div
					class="absolute inset-0 bg-linear-to-br from-indigo-500/20 to-purple-600/20 rounded-2xl blur-xl transform rotate-3"
				></div>

				<div class="bg-slate-950 border border-slate-800 rounded-2xl p-8 shadow-2xl relative z-10">
					<div class="flex items-center justify-between mb-8 pb-4 border-b border-slate-800">
						<div>
							<h3 class="text-2xl font-bold text-white">Blackwell B200</h3>
							<span class="text-indigo-400 text-sm">Dual-Die Design</span>
						</div>
						<Microchip class="h-10 w-10 text-indigo-500 opacity-80" />
					</div>

					<div class="space-y-4">
						<div class="flex justify-between items-center py-2 border-b border-slate-800/50">
							<span class="text-slate-400">FP4 Dense Tensor Core</span>
							<span class="text-white font-mono font-bold text-lg">20 PFLOPS</span>
						</div>
						<div class="flex justify-between items-center py-2 border-b border-slate-800/50">
							<span class="text-slate-400">FP8 Dense Tensor Core</span>
							<span class="text-white font-mono font-bold">10 PFLOPS</span>
						</div>
						<div class="flex justify-between items-center py-2 border-b border-slate-800/50">
							<span class="text-slate-400">Memory Bandwidth</span>
							<span class="text-white font-mono font-bold">8 TB/s</span>
						</div>
						<div class="flex justify-between items-center py-2">
							<span class="text-slate-400">Total VRAM</span>
							<span class="text-indigo-400 font-mono font-bold">192 GB</span>
						</div>
					</div>

					<div class="mt-8 bg-indigo-900/20 rounded-lg p-4 border border-indigo-500/20">
						<p class="text-sm text-indigo-200">
							<strong class="text-white">Note:</strong> B200 фактически состоит из двух кристаллов (dies),
							соединенных интерфейсом NV-HBI со скоростью 10 ТБ/с, работая как единый GPU.
						</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<section class="py-24 bg-slate-900/30 border-t border-slate-800">
	<div class="container mx-auto px-4 md:px-6">
		<div class="text-center mb-16">
			<h2 class="text-3xl font-bold tracking-tight text-white">За пределами возможного</h2>
		</div>

		<div class="grid grid-cols-1 md:grid-cols-3 gap-8">
			{#each useCases as useCase}
				<div
					class="group relative p-8 rounded-2xl border border-slate-800 bg-slate-950 hover:border-indigo-500/50 transition-all hover:-translate-y-1"
				>
					<div
						class="absolute inset-0 bg-linear-to-br from-indigo-600/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl"
					></div>

					<div class="relative">
						<div
							class="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-slate-900 border border-slate-800 text-indigo-400 mb-6 group-hover:scale-110 transition-transform"
						>
							<Network class="h-6 w-6" />
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
	<div class="absolute inset-0 bg-linear-to-b from-slate-950 to-indigo-950/30"></div>
	<div class="container relative z-10 mx-auto px-4 text-center">
		<h2 class="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
			Готовы запустить B200?
		</h2>
		<p class="text-slate-400 mb-10 max-w-2xl mx-auto text-lg">
			Разверните свой инстанс B200 за пару минут. Без долгосрочных контрактов.
		</p>
		<a
			href={`${appConfig.CONSOLE_URL}/instances/`}
			class="inline-flex h-14 items-center justify-center rounded-lg cursor-pointer bg-brand-600 px-10 text-lg font-bold text-white transition-all hover:bg-brand-500 hover:shadow-lg hover:shadow-brand-500/25"
		>
			Запустить B200
		</a>
	</div>
</section>

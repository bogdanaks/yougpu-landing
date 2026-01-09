<script lang="ts">
	import { ArrowRight, Zap } from 'lucide-svelte';
	import { appConfig } from '$shared/config/app-config';
</script>

<section class="relative overflow-hidden py-24 md:py-32">
	<div aria-hidden="true" class="absolute inset-0 z-0 overflow-hidden pointer-events-none">
		<div
			class="absolute left-[calc(50%-20rem)] -top-40 h-200 w-200 -translate-x-1/2 rotate-30 bg-linear-to-tr from-brand-600/20 to-purple-600/20 blur-[100px] opacity-50 md:left-[calc(50%-30rem)] md:h-280 md:w-280"
		></div>
	</div>

	<div class="container relative z-10 mx-auto px-4 md:px-6 text-center">
		<div
			class="inline-flex items-center rounded-full border border-brand-500/30 bg-brand-500/10 px-3 py-1 text-sm font-medium text-brand-300 mb-8 backdrop-blur"
		>
			<Zap class="mr-2 h-4 w-4" />
			<span>Агрегатор GPU нового поколения</span>
		</div>

		<h1
			class="mx-auto max-w-4xl text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
		>
			Доступ к <span class="text-brand-500">GPU-вычислениям</span> по всему миру. Мгновенно.
		</h1>

		<p class="mx-auto mt-6 max-w-2xl text-lg text-slate-400 md:text-xl">
			Арендуйте A100, H100, RTX 4090 и другие GPU от проверенных провайдеров в одном интерфейсе.
			Прозрачный поминутный биллинг. Деплой за минуты.
		</p>

		<div class="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
			<a
				href={`${appConfig.CONSOLE_URL}/login`}
				class="inline-flex h-12 items-center justify-center rounded-md bg-brand-600 px-8 text-base font-semibold text-white transition-all hover:bg-brand-500 hover:shadow-lg hover:shadow-brand-500/25 w-full sm:w-auto"
			>
				Найти GPU сейчас
				<ArrowRight class="ml-2 h-5 w-5" />
			</a>
			<a
				href="#pricing"
				class="inline-flex h-12 items-center justify-center rounded-md border border-slate-700 bg-slate-900/50 px-8 text-base font-semibold text-white transition-colors hover:bg-slate-800/80 w-full sm:w-auto"
			>
				Посмотреть цены
			</a>
		</div>

		<div
			class="mt-16 grid grid-cols-2 gap-4 border-t border-slate-800 pt-8 sm:grid-cols-4 md:max-w-3xl mx-auto"
		>
			<div>
				<div class="text-3xl font-bold text-white">50+</div>
				<div class="mt-1 text-sm text-slate-400">Доступных GPU</div>
			</div>
			<div>
				<div class="text-3xl font-bold text-white">1</div>
				<div class="mt-1 text-sm text-slate-400">Провайдер</div>
			</div>
			<div>
				<div class="text-3xl font-bold text-white">~2 мин</div>
				<div class="mt-1 text-sm text-slate-400">Время деплоя</div>
			</div>
			<div>
				<div class="text-3xl font-bold text-white">20 ₽/ч</div>
				<div class="mt-1 text-sm text-slate-400">Цены от</div>
			</div>
		</div>
	</div>
</section>

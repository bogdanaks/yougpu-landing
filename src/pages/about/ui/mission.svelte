<script lang="ts">
	import { Cpu, Globe, ShieldCheck, Target, Zap } from 'lucide-svelte';

	const stats = [
		{ icon: Cpu, label: 'Моделей GPU', value: '50+' },
		{ icon: Zap, label: 'Время деплоя', value: '~2 мин' },
		{ icon: ShieldCheck, label: 'Uptime сети', value: '99.9%' }
	];
</script>

<section class="py-16 bg-slate-900/50 border-y border-slate-800/50">
	<div class="container mx-auto px-4 md:px-6">
		<div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
			<div>
				<div
					class="inline-flex items-center rounded-full border border-brand-500/30 bg-brand-500/10 px-3 py-1 text-sm font-medium text-brand-300 mb-6"
				>
					<Target class="mr-2 h-4 w-4" />
					<span>Наша Миссия</span>
				</div>
				<h2 class="text-3xl font-bold tracking-tight sm:text-4xl mb-6">
					Сделать мощные GPU доступными для каждого
				</h2>
				<p class="text-slate-300 text-lg leading-relaxed mb-6">
					Мы верим, что доступ к передовым вычислительным ресурсам не должен быть привилегией
					крупных корпораций. Обучение современных нейросетей и научные исследования требуют
					огромных мощностей, которые часто недоступны из-за высокой цены или дефицита.
				</p>
				<p class="text-slate-300 text-lg leading-relaxed">
					YouGPU решает эту проблему, объединяя проверенных провайдеров по всему миру в единую
					платформу. Мы убираем барьеры в виде сложных контрактов, долгих проверок и непрозрачного
					ценообразования, чтобы вы могли сосредоточиться на создании инноваций.
				</p>
			</div>
			<div
				class="relative flex items-center justify-center p-8 rounded-2xl bg-linear-to-br from-brand-900/20 to-slate-900/50 border border-slate-800"
			>
				<Globe class="w-64 h-64 text-brand-500/30" />
				<div
					class="absolute inset-0 bg-linear-to-t from-slate-950/50 to-transparent rounded-2xl"
				></div>
				<div class="absolute bottom-6 left-6 right-6 grid grid-cols-3 gap-4 text-center">
					{#each stats as stat}
						<div class="bg-slate-900/80 border border-slate-800 p-4 rounded-xl backdrop-blur-sm">
							<svelte:component this={stat.icon} class="h-6 w-6 mx-auto text-brand-400 mb-2" />
							<div class="text-2xl font-bold text-white">{stat.value}</div>
							<div class="text-xs text-slate-400">{stat.label}</div>
						</div>
					{/each}
				</div>
			</div>
		</div>
	</div>
</section>

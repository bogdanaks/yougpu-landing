<script lang="ts">
	import { Layers, Globe2, Clock, ShieldCheck } from 'lucide-svelte';

	const features = [
		{
			icon: Layers,
			title: 'Единый агрегатор',
			description:
				'Больше не нужно регистрироваться у десятка провайдеров. Мы ищем лучшие предложения от DataCrunch, AWS и других в одном месте.'
		},
		{
			icon: Globe2,
			title: 'Глобальное покрытие',
			description:
				'Выбирайте сервера в регионах, которые ближе к вам или вашим данным, чтобы минимизировать задержки.'
		},
		{
			icon: Clock,
			title: 'Почасовая оплата',
			description:
				'Честный Pre-paid биллинг. Платите только за то время, когда сервер включен. Никаких скрытых контрактов.'
		},
		{
			icon: ShieldCheck,
			title: 'Мгновенный доступ',
			description:
				'Забудьте о долгих верификациях и квотах. Получите доступ к мощностям сразу после пополнения баланса.'
		}
	];
</script>

<section id="features" class="py-24 bg-slate-900/50 relative border-y border-slate-800/50">
	<div class="container mx-auto px-4 md:px-6">
		<div class="text-center mb-16">
			<h2 class="text-3xl font-bold tracking-tight sm:text-4xl">Почему выбирают YouGPU?</h2>
			<p class="mt-4 text-lg text-slate-400 max-w-2xl mx-auto">
				Мы упрощаем процесс поиска и аренды вычислительных мощностей для ML-инженеров и
				исследователей.
			</p>
		</div>

		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
			{#each features as feature}
				<div
					class="group relative p-6 rounded-2xl border border-slate-800 bg-slate-950 transition-all hover:border-brand-500/50 hover:shadow-lg hover:shadow-brand-500/10"
				>
					<div
						class="absolute -inset-px rounded-2xl bg-linear-to-b from-brand-500/20 to-transparent opacity-0 transition-opacity group-hover:opacity-100"
						aria-hidden="true"
					></div>
					<div class="relative">
						<div
							class="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-brand-900/50 text-brand-400 mb-6"
						>
							<svelte:component this={feature.icon} class="h-6 w-6" />
						</div>
						<h3 class="text-xl font-semibold text-white mb-3">
							{feature.title}
						</h3>
						<p class="text-slate-400">
							{feature.description}
						</p>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>

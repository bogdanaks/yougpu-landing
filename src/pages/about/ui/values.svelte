<script lang="ts">
	import { Globe, ShieldCheck, Target, Zap } from 'lucide-svelte';

	const values = [
		{
			icon: Zap,
			title: 'Скорость и Доступность',
			description:
				'Мы стремимся сделать доступ к высокопроизводительным вычислениям мгновенным для каждого.'
		},
		{
			icon: ShieldCheck,
			title: 'Прозрачность и Безопасность',
			description:
				'Честный биллинг и надежные партнеры. Безопасность данных пользователей — наш приоритет.'
		},
		{
			icon: Globe,
			title: 'Глобальный Охват',
			description:
				'Стираем границы, объединяя ресурсы дата-центров по всему миру в единую экосистему.'
		},
		{
			icon: Target,
			title: 'Фокус на Пользователе',
			description:
				'Мы создаем инструменты, которые упрощают жизнь разработчикам и исследователям, а не усложняют её.'
		}
	];
</script>

<section class="py-24">
	<div class="container mx-auto px-4 md:px-6">
		<div class="text-center mb-16">
			<h2 class="text-3xl font-bold tracking-tight sm:text-4xl">Наши Ценности</h2>
			<p class="mt-4 text-lg text-slate-400 max-w-2xl mx-auto">
				Принципы, которыми мы руководствуемся при создании продукта и взаимодействии с клиентами.
			</p>
		</div>
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
			{#each values as value}
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
							<svelte:component this={value.icon} class="h-6 w-6" />
						</div>
						<h3 class="text-xl font-semibold text-white mb-3">{value.title}</h3>
						<p class="text-slate-400">{value.description}</p>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>

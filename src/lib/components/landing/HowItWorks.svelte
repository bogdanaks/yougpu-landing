<script lang="ts">
	import { Wallet, Search, Terminal, ArrowRight } from 'lucide-svelte';

	const steps = [
		{
			id: 1,
			title: 'Пополните баланс',
			description:
				'Регистрация занимает 30 секунд. Пополните счет картой или криптовалютой (USDT) без KYC и ожидания.',
			icon: Wallet
		},
		{
			id: 2,
			title: 'Выберите конфигурацию',
			description:
				'Используйте фильтры, чтобы найти нужный GPU (A100, H100, 4090) в нужном регионе.',
			icon: Search
		},
		{
			id: 3,
			title: 'Подключитесь',
			description:
				'Нажмите Deploy. Через ~2 минуты вы получите IP, root пароль и доступ к SSH или Jupyter Notebook.',
			icon: Terminal
		}
	];
</script>

<section id="how-it-works" class="py-24 bg-slate-950 relative overflow-hidden">
	<div
		class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-200 h-100 bg-brand-900/10 blur-[100px] rounded-full pointer-events-none"
	></div>

	<div class="container mx-auto px-4 md:px-6 relative z-10">
		<div class="text-center mb-16">
			<h2 class="text-3xl font-bold tracking-tight text-white sm:text-4xl">
				От идеи до обучения модели — 3 шага
			</h2>
		</div>

		<div class="relative grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-8">
			{#each steps as step, i}
				<div class="relative flex flex-col items-center text-center group">
					{#if i !== steps.length - 1}
						<div class="hidden md:block absolute top-8 left-[60%] w-[80%] text-slate-800">
							<svg
								class="w-full h-6 text-slate-800"
								fill="none"
								viewBox="0 0 100 24"
								preserveAspectRatio="none"
							>
								<path
									d="M0,12 L90,12"
									stroke="currentColor"
									stroke-width="2"
									stroke-dasharray="4 4"
								/>
								<path
									d="M90,12 L85,8"
									stroke="currentColor"
									stroke-width="2"
									stroke-linecap="round"
								/>
								<path
									d="M90,12 L85,16"
									stroke="currentColor"
									stroke-width="2"
									stroke-linecap="round"
								/>
							</svg>
						</div>
					{/if}

					<div class="relative mb-6">
						<div
							class="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-900 border border-slate-800 shadow-xl transition-all duration-300 group-hover:border-brand-500/50 group-hover:shadow-brand-500/20 group-hover:-translate-y-1"
						>
							<svelte:component this={step.icon} class="h-8 w-8 text-brand-400" />
						</div>
						<div
							class="absolute -top-3 -right-3 flex h-8 w-8 items-center justify-center rounded-full bg-brand-600 text-sm font-bold text-white border-4 border-slate-950"
						>
							{step.id}
						</div>
					</div>

					<h3 class="text-xl font-semibold text-white mb-3">
						{step.title}
					</h3>
					<p class="text-slate-400 leading-relaxed max-w-xs">
						{step.description}
					</p>
				</div>
			{/each}
		</div>
	</div>
</section>

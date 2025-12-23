<script>
	import { Terminal, Box, FileCode, Brain } from 'lucide-svelte';

	const techStack = [
		{
			name: 'Ubuntu',
			role: 'OS & Drivers',
			icon: Terminal,
			description: 'Чистая система с предустановленными драйверами NVIDIA CUDA.'
		},
		{
			name: 'Docker',
			role: 'Virtualization',
			icon: Box,
			description: 'Полная поддержка NVIDIA Container Toolkit для запуска контейнеров.'
		},
		{
			name: 'JupyterLab',
			role: 'Interactive',
			icon: FileCode,
			description: 'Запускайте ноутбуки прямо в браузере сразу после деплоя.'
		},
		{
			name: 'ML Frameworks',
			role: 'Ready-to-use',
			icon: Brain,
			description: 'Поддержка PyTorch, TensorFlow и других инструментов из коробки.'
		}
	];
</script>

<section class="py-24 bg-slate-900/30 border-y border-slate-800/50 relative overflow-hidden">
	<div
		class="absolute inset-0 bg-linear-to-b from-transparent via-slate-900/20 to-transparent pointer-events-none"
	></div>

	<div class="container mx-auto px-4 md:px-6 text-center relative z-10">
		<div class="mb-12">
			<h2 class="text-3xl font-bold tracking-tight text-white sm:text-4xl mb-4">
				Окружение, готовое к работе
			</h2>
			<p class="text-lg text-slate-400 max-w-2xl mx-auto">
				Не тратьте время на настройку среды. Получите полностью готовый инстанс для ML-задач за пару
				минут.
			</p>
		</div>

		<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
			{#each techStack as tech}
				<div
					class="group relative p-6 rounded-2xl bg-slate-950 border border-slate-800 transition-all hover:border-brand-500/30 hover:shadow-lg hover:shadow-brand-500/5 text-left"
				>
					<div
						class="mb-5 inline-flex items-center justify-center p-3 rounded-xl bg-slate-900 border border-slate-800 group-hover:bg-brand-900/20 group-hover:text-brand-400 group-hover:border-brand-500/20 transition-all text-slate-400"
					>
						<svelte:component this={tech.icon} class="h-6 w-6" />
					</div>

					<h3 class="text-lg font-bold text-white mb-1">{tech.name}</h3>
					<div class="text-xs font-semibold text-brand-500 mb-3 uppercase tracking-wider">
						{tech.role}
					</div>
					<p class="text-sm text-slate-400 leading-relaxed">
						{tech.description}
					</p>
				</div>
			{/each}
		</div>
	</div>
</section>

<script>
	import { Bot, Users, Mail, ExternalLink } from 'lucide-svelte';

	const contactMethods = [
		{
			icon: Bot,
			title: 'Support Bot',
			description: 'Мгновенная помощь по аккаунту, оплатам и доступам.',
			action: 'Открыть бота',
			link: 'https://t.me/yougpu_bot',
			primary: true,
			color: 'text-brand-400',
			bg: 'bg-brand-500/10 border-brand-500/20'
		},
		{
			icon: Users,
			title: 'Community',
			description: 'Чат участников. Советы по настройке ML-окружения.',
			action: 'Вступить в чат',
			link: 'https://t.me/yougpu_chat',
			primary: false,
			color: 'text-blue-400',
			bg: 'bg-blue-500/10 border-blue-500/20'
		},
		{
			icon: Mail,
			title: 'Email',
			description: 'Для B2B партнеров, юридических запросов и прессы.',
			action: 'hello@yougpu.ru',
			link: 'mailto:hello@yougpu.ru',
			primary: false,
			color: 'text-emerald-400',
			bg: 'bg-emerald-500/10 border-emerald-500/20'
		}
	];
</script>

<div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
	{#each contactMethods as method}
		<a
			href={method.link}
			target="_blank"
			class="group relative p-6 rounded-2xl border transition-all duration-300 flex flex-col items-start
      hover:-translate-y-1 hover:shadow-xl hover:shadow-brand-500/5
      bg-slate-900/50 border-slate-800 hover:border-slate-700"
		>
			<div class="p-3 rounded-xl mb-4 {method.bg} {method.color}">
				<svelte:component this={method.icon} class="h-6 w-6" />
			</div>

			<h3 class="text-xl font-bold text-white mb-2">{method.title}</h3>
			<p class="text-slate-400 text-sm mb-6 leading-relaxed flex-1">
				{method.description}
			</p>

			<div
				class="mt-auto w-full pt-4 border-t border-slate-800/50 flex items-center justify-between text-sm font-medium text-white group-hover:text-brand-400 transition-colors"
			>
				{method.action}
				<ExternalLink class="h-4 w-4 opacity-50 group-hover:opacity-100 transition-opacity" />
			</div>
		</a>
	{/each}
</div>

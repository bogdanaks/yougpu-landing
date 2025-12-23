<script lang="ts">
	import { ChevronDown, ChevronUp } from 'lucide-svelte';

	const faqs = [
		{
			q: 'Как быстро я получу доступ к серверу?',
			a: 'Доступ предоставляется автоматически в течение 2-5 минут после оплаты. Вы получите IP и root-пароль в личном кабинете и уведомлением в боте.'
		},
		{
			q: 'Могу ли я оплатить как юрлицо?',
			a: 'Да, мы работаем с юридическими лицами. Напишите на hello@yougpu.com, чтобы запросить счет и договор.'
		},
		{
			q: 'Есть ли защита от DDoS?',
			a: 'Базовая защита включена на всех тарифах. Если вам нужна защита L7 для веб-сервисов, напишите в поддержку.'
		},
		{
			q: 'Можно ли майнить на серверах?',
			a: 'Майнинг разрешен только на специальных выделенных серверах (категория "Crypto"). На ML-инстансах майнинг запрещен, аккаунт будет заблокирован.'
		}
	];

	let openFaqIndex: number | null = 0;

	function toggleFaq(index: number) {
		openFaqIndex = openFaqIndex === index ? null : index;
	}
</script>

<div class="max-w-3xl mx-auto">
	<h2 class="text-2xl font-bold text-white mb-8 text-center">Частые вопросы</h2>

	<div class="space-y-4">
		{#each faqs as faq, i}
			<div
				class="rounded-xl border border-slate-800 bg-slate-900/30 overflow-hidden transition-all duration-300 {openFaqIndex ===
				i
					? 'border-brand-500/30 bg-slate-900/80'
					: 'hover:border-slate-700'}"
			>
				<button
					on:click={() => toggleFaq(i)}
					class="w-full flex items-center justify-between p-5 text-left focus:outline-none"
				>
					<span class="font-medium text-white pr-4">{faq.q}</span>
					{#if openFaqIndex === i}
						<ChevronUp class="h-5 w-5 text-brand-500 shrink-0" />
					{:else}
						<ChevronDown class="h-5 w-5 text-slate-500 shrink-0" />
					{/if}
				</button>

				{#if openFaqIndex === i}
					<div
						class="px-5 pb-5 text-slate-400 text-sm leading-relaxed border-t border-slate-800/50 pt-4 animate-in fade-in slide-in-from-top-2 duration-200"
					>
						{faq.a}
					</div>
				{/if}
			</div>
		{/each}
	</div>
</div>

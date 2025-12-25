<script lang="ts">
	import { ChevronDown, ChevronUp } from 'lucide-svelte';

	const faqs = [
		{
			q: 'Как быстро я получу доступ к серверу?',
			a: 'Доступ предоставляется автоматически в течение 2-5 минут после оплаты. Вы получите IP и root-пароль, в карточке инстанса будет вся информация для подключения.'
		},
		{
			q: 'Нужно ли мне вручную устанавливать драйверы и CUDA?',
			a: 'Нет, всё уже готово к работе. Мы предоставляем образы с предустановленными драйверами Nvidia, CUDA Toolkit, Docker и популярными ML-фреймворками (PyTorch, TensorFlow). Вы получаете полностью настроенное окружение сразу после запуска инстанса.'
		},
		{
			q: 'Сохраняются ли мои данные, если я остановлю инстанс?',
			a: 'Да, данные на диске сохраняются. Если вы нажмете «Остановить» (Stop), мы освободим GPU, и списание за него прекратится, но ваши данные останутся на диске. В этом режиме вы платите только небольшую сумму за аренду дискового пространства. При полном удалении (Terminate) инстанса данные стираются безвозвратно.'
		},
		{
			q: 'Можно ли майнить на серверах?',
			a: 'Нет, на инстансах майнинг запрещен, аккаунт будет заблокирован.'
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

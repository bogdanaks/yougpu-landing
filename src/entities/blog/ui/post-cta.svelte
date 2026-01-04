<script lang="ts">
	import { appConfig } from '$shared/config/app-config';

	export let title = 'Готовы начать без вложений?';
	export let description =
		'Арендуйте GPU с поминутной оплатой. Никакого шума, никаких счетов за свет.';
	export let btnText = 'Найти сервер →';
	export let link = `${appConfig.CONSOLE_URL}/login`;
</script>

<div class="mt-8 p-6 bg-slate-900 border border-brand-500/30 rounded-xl text-center not-prose">
	<h3 class="text-xl font-bold text-white mb-2">{title}</h3>
	<p class="text-slate-400 mb-4">{description}</p>
	<a
		href={link}
		class="inline-block bg-brand-600 hover:bg-brand-500 text-white font-bold py-2 px-6 rounded transition"
	>
		{btnText}
	</a>
</div>

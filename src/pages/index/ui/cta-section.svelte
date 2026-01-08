<script lang="ts">
	import { Rocket } from 'lucide-svelte';
	import { appConfig } from '$shared/config/app-config';
</script>

<section class="py-24 relative overflow-hidden">
	<div class="absolute inset-0 bg-linear-to-br from-brand-900 to-slate-950 opacity-50"></div>
	<div
		class="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-brand-600/20 blur-3xl mix-blend-overlay"
	></div>
	<div
		class="absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-purple-600/20 blur-3xl mix-blend-overlay"
	></div>

	<div class="container relative z-10 mx-auto px-4 md:px-6 text-center">
		<div
			class="mx-auto inline-flex h-16 w-16 items-center justify-center rounded-full bg-brand-600 mb-8 shadow-lg shadow-brand-600/30"
		>
			<Rocket class="h-8 w-8 text-white" />
		</div>
		<h2 class="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-4xl">
			Готовы запустить свою задачу?
		</h2>
		<p class="mx-auto mt-4 max-w-xl text-lg text-slate-300">
			Начните с небольшого депозита. Доступ к серверам открывается мгновенно после регистрации.
		</p>
		<div class="mt-10">
			<a
				href={`${appConfig.CONSOLE_URL}/register`}
				class="inline-flex h-12 items-center justify-center rounded-md bg-white px-8 text-base font-bold text-brand-600 transition-all hover:bg-slate-100 hover:shadow-lg hover:scale-105"
			>
				Создать аккаунт
			</a>
		</div>
	</div>
</section>

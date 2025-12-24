<script>
	import { appConfig } from '$shared/config/app-config';
	import { ArrowRight } from 'lucide-svelte';
</script>

<section class="py-24 relative overflow-hidden">
	<div class="absolute inset-0 bg-linear-to-br from-brand-900 to-slate-950 opacity-50"></div>
	<div
		class="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-brand-600/20 blur-3xl mix-blend-overlay"
	></div>
	<div class="container relative z-10 mx-auto px-4 md:px-6 text-center">
		<h2 class="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-4xl">
			Станьте частью будущего вычислений
		</h2>
		<p class="mx-auto mt-4 max-w-xl text-lg text-slate-300">
			Присоединяйтесь к тысячам инженеров и исследователей, которые уже используют YouGPU для своих
			проектов.
		</p>
		<div class="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
			<a
				href={`${appConfig.CONSOLE_URL}/register`}
				class="inline-flex h-12 items-center justify-center rounded-md bg-white px-8 text-base font-bold text-brand-600 transition-all hover:bg-slate-100 hover:shadow-lg hover:scale-105 w-full sm:w-auto"
			>
				Создать аккаунт
			</a>
			<a
				href="/contact"
				class="inline-flex h-12 items-center justify-center rounded-md border border-slate-700 bg-slate-900/50 px-8 text-base font-semibold text-white transition-colors hover:bg-slate-800/80 w-full sm:w-auto"
			>
				Связаться с нами
				<ArrowRight class="ml-2 h-5 w-5" />
			</a>
		</div>
	</div>
</section>

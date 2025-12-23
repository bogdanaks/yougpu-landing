<script lang="ts">
	import logo from '$lib/assets/logo.png';
	const currentYear = new Date().getFullYear();
</script>

<footer class="bg-slate-950 border-t border-slate-800 py-12">
	<div class="container mx-auto px-4 md:px-6 lg:grid lg:grid-cols-3 lg:gap-8">
		<div class="space-y-4 mb-8 lg:mb-0">
			<a href="/" class="flex items-center gap-2 text-lg font-bold tracking-tight">
				<img alt="Logo" src={logo} width="32" />
				<span class="text-white">YouGPU</span>
			</a>
			<p class="text-sm text-slate-400 max-w-xs">
				Агрегатор вычислительных мощностей для AI, ML и рендеринга. Мы делаем GPU доступнее.
			</p>
		</div>

		<div class="grid grid-cols-2 gap-8 lg:col-span-2 sm:grid-cols-3">
			<div>
				<h3 class="text-sm font-semibold text-white">Продукт</h3>
				<ul class="mt-4 space-y-3 text-sm text-slate-400">
					<li><a href="#features" class="hover:text-white transition-colors">Преимущества</a></li>
					<li><a href="#pricing" class="hover:text-white transition-colors">Цены</a></li>
					<!-- <li><a href="/docs" class="hover:text-white transition-colors">Документация</a></li> -->
				</ul>
			</div>
			<div>
				<h3 class="text-sm font-semibold text-white">Компания</h3>
				<ul class="mt-4 space-y-3 text-sm text-slate-400">
					<li><a href="/about" class="hover:text-white transition-colors">О нас</a></li>
					<li><a href="/contact" class="hover:text-white transition-colors">Контакты</a></li>
				</ul>
			</div>
			<div>
				<h3 class="text-sm font-semibold text-white">Документы</h3>
				<ul class="mt-4 space-y-3 text-sm text-slate-400">
					<li>
						<a href="/terms-of-service" class="hover:text-white transition-colors"
							>Условия использования</a
						>
					</li>
					<li>
						<a href="/privacy-policy" class="hover:text-white transition-colors"
							>Политика конфиденциальности</a
						>
					</li>
				</ul>
			</div>
		</div>
	</div>

	<div
		class="container mx-auto px-4 md:px-6 mt-12 pt-8 border-t border-slate-800/50 flex flex-col md:flex-row justify-between items-center"
	>
		<p class="text-sm text-slate-500">
			© {currentYear} YouGPU. Все права защищены.
		</p>
		<div class="flex gap-4 mt-4 md:mt-0"></div>
	</div>
</footer>

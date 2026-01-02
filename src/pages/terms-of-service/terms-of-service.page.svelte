<script>
	import { ArrowLeft, TriangleAlert } from 'lucide-svelte';

	const currentYear = new Date().getFullYear();
</script>

<div class="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 font-sans text-gray-900">
	<div class="mx-auto max-w-4xl">
		<div class="mb-8 flex items-center justify-between">
			<a
				href="/"
				class="inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200/50 hover:text-gray-900"
			>
				<ArrowLeft size={16} />
				На главную
			</a>
		</div>

		<div class="rounded-lg border border-gray-200 bg-white p-6 shadow-sm sm:p-10">
			<div class="space-y-8">
				<div>
					<div class="mb-2">
						<h1 class="mb-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
							Условия использования (Публичная оферта)
						</h1>
						<p class="text-sm text-gray-500">Последнее обновление: 21 декабря 2025</p>
					</div>

					<p class="text-sm italic text-gray-700">
						Внимание: Регистрируясь в сервисе YouGPU, пополняя баланс или запуская инстанс, вы
						безоговорочно принимаете данные условия.
					</p>
				</div>

				<section>
					<h3 class="mb-3 text-xl font-semibold text-gray-900">1. Общие положения</h3>
					<p class="text-base leading-relaxed text-gray-700">
						Настоящее Соглашение регулирует отношения между сервисом аренды вычислительных мощностей{' '}
						<strong class="font-bold text-gray-900">YouGPU</strong> (далее — «Исполнитель») и пользователем
						сервиса (далее — «Клиент»). Услуги предоставляются по модели "как есть" (as is).
					</p>
				</section>

				<section>
					<h3 class="mb-3 text-xl font-semibold text-gray-900">2. Предмет соглашения</h3>
					<ul class="space-y-2 text-gray-700 pl-4 list-disc marker:text-gray-500">
						<li>
							<span
								>Исполнитель предоставляет Клиенту доступ к виртуальным серверам с GPU, дисковому
								пространству и сетевым ресурсам.</span
							>
						</li>
						<li>
							<span
								>Клиент обязуется своевременно оплачивать потребленные ресурсы согласно тарифам,
								указанным в Консоли управления.</span
							>
						</li>
						<li>
							<span>Тарификация производится почасово.</span>
						</li>
					</ul>
				</section>

				<section>
					<h3 class="mb-3 text-xl font-semibold text-gray-900">3. Правила использования (AUP)</h3>
					<p class="mb-4 text-base text-gray-700">
						Мы придерживаемся политики нулевой терпимости к злоупотреблениям. Аккаунт Клиента будет{' '}
						<strong class="font-bold text-gray-900">заблокирован без возврата средств</strong> при обнаружении
						следующей активности:
					</p>

					<div class="rounded bg-red-50 p-4 border border-red-100">
						<ul class="space-y-3">
							{#each ['Сканирование портов, DDoS-атаки (входящие и исходящие), распространение вредоносного ПО (Malware, Botnets).', 'Размещение фишинговых сайтов, мошеннических схем, кардинг.', 'Майнинг криптовалют.', 'Действия, нарушающие законодательство страны размещения сервера.'] as item}
								<li class="flex items-start gap-3">
									<div
										class="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-100 text-red-600"
									>
										<TriangleAlert size={12} strokeWidth={3} />
									</div>
									<span class="text-sm text-gray-800">{item}</span>
								</li>
							{/each}
						</ul>
					</div>
				</section>

				<section>
					<h3 class="mb-3 text-xl font-semibold text-gray-900">4. Оплата и Возврат средств</h3>
					<ul class="space-y-2 text-gray-700 pl-4 list-disc marker:text-gray-500">
						<li>
							<span>
								<strong class="font-semibold text-gray-900">Списание:</strong> Средства списываются с
								баланса автоматически пока инстанс находится в статусе «Running» (Запущен). Для остановки
								списаний необходимо остановить или удалить инстанс.
							</span>
						</li>
						<li>
							<span>
								<strong class="font-semibold text-gray-900">Отрицательный баланс:</strong> При достижении
								нулевого баланса инстансы принудительно останавливаются. Если баланс не пополнен в течение
								72 часов, данные могут быть удалены безвозвратно.
							</span>
						</li>
						<li>
							<span>
								<strong class="font-semibold text-gray-900">Возврат:</strong> Возврат средств возможен
								только за неиспользованный остаток баланса по заявке в техподдержку. Средства, списанные
								за фактически оказанные услуги (время работы сервера), возврату не подлежат.
							</span>
						</li>
					</ul>
				</section>

				<section>
					<h3 class="mb-3 text-xl font-semibold text-gray-900">5. Ответственность и Данные</h3>
					<p class="mb-3 text-gray-700">
						Исполнитель прилагает все усилия для обеспечения доступности сервиса (SLA 99.9%),
						однако:
					</p>
					<ul class="space-y-2 text-gray-700 pl-4 list-disc marker:text-gray-500">
						<li>
							<span>
								<strong class="font-semibold text-gray-900">Бэкапы:</strong> Клиент несет полную ответственность
								за сохранность своих данных. Мы рекомендуем регулярно делать резервные копии на внешние
								хранилища.
							</span>
						</li>
						<li>
							<span>
								<strong class="font-semibold text-gray-900">Ограничение ответственности:</strong> YouGPU
								не несет ответственности за упущенную выгоду, прерывание бизнес-процессов или потерю данных,
								вызванную аппаратными сбоями или действиями третьих лиц.
							</span>
						</li>
					</ul>
				</section>

				<section>
					<h3 class="mb-3 text-xl font-semibold text-gray-900">6. Изменение условий</h3>
					<p class="text-gray-700 leading-relaxed">
						YouGPU оставляет за собой право изменять тарифы и условия оферты. Уведомление об
						изменениях публикуется на сайте или рассылается по Email за 7 дней до вступления в силу.
						Продолжение использования сервиса означает согласие с новыми условиями.
					</p>
				</section>

				<section>
					<h3 class="mb-3 text-xl font-semibold text-gray-900">7. Реквизиты и Контакты</h3>
					<p class="text-gray-700">
						Любые споры решаются путем переговоров через службу поддержки.
					</p>
					<ul class="mt-4 space-y-2 text-gray-700 pl-4 list-disc marker:text-gray-500">
						<li>
							<span>
								Email для юридических запросов: <a
									href="mailto:legal@yougpu.ru"
									class="text-blue-600 hover:underline">legal@yougpu.ru</a
								>
							</span>
						</li>
						<li>
							<span>
								Техподдержка: <a
									href="https://t.me/yougpu_support"
									target="_blank"
									rel="noopener noreferrer"
									class="text-blue-600 hover:underline">@yougpu_support</a
								>
							</span>
						</li>
					</ul>
				</section>
			</div>
		</div>

		<div class="mt-12 text-center text-xs text-gray-500">
			&copy; {currentYear} YouGPU. Все права защищены.
		</div>
	</div>
</div>

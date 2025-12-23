<script>
	import { ArrowLeft } from 'lucide-svelte';

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
					<h1 class="mb-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
						Политика конфиденциальности
					</h1>
					<p class="text-sm text-gray-500">Последнее обновление: 21 декабря 2025</p>
				</div>

				<p class="text-base text-gray-700 leading-relaxed">
					Мы, команда <strong class="font-bold text-gray-900">YouGPU</strong> (далее — «Мы», «Сервис»),
					серьезно относимся к конфиденциальности ваших данных. В этом документе описано, как мы собираем,
					используем и защищаем вашу информацию при использовании наших услуг аренды вычислительных мощностей.
				</p>

				<section>
					<h3 class="mb-3 text-xl font-semibold text-gray-900">1. Какие данные мы собираем</h3>
					<p class="mb-3 text-gray-700">
						Мы собираем только те данные, которые необходимы для функционирования сервиса и
						исполнения договора оферты:
					</p>
					<ul class="list-disc pl-4 space-y-2 text-gray-700 marker:text-gray-500">
						<li>
							<strong class="font-semibold text-gray-900">Учетная запись:</strong> Email, имя пользователя,
							хеш пароля.
						</li>
						<li>
							<strong class="font-semibold text-gray-900">Биллинг:</strong> История транзакций, мы не
							храним данные карт, они обрабатываются платежным шлюзом.
						</li>
						<li>
							<strong class="font-semibold text-gray-900">Технические данные:</strong> IP-адреса входа,
							логи действий в консоли, SSH-ключи (публичные части).
						</li>
						<li>
							<strong class="font-semibold text-gray-900">Данные инстансов:</strong> Мы не имеем доступа
							к содержимому ваших виртуальных машин и дисков, за исключением автоматизированных процессов
							резервного копирования (если включено).
						</li>
					</ul>
				</section>

				<section>
					<h3 class="mb-3 text-xl font-semibold text-gray-900">2. Как мы используем ваши данные</h3>
					<ul class="list-disc pl-4 space-y-2 text-gray-700 marker:text-gray-500">
						<li>Для предоставления доступа к вычислительным мощностям (GPU).</li>
						<li>Для обработки платежей и выставления счетов.</li>
						<li>Для уведомления о статусе серверов (Email-рассылки, уведомления).</li>
						<li>
							Для предотвращения мошенничества (Fraud detection) и майнинга криптовалют на
							запрещенных тарифах.
						</li>
					</ul>
				</section>

				<section>
					<h3 class="mb-3 text-xl font-semibold text-gray-900">3. Передача данных третьим лицам</h3>
					<p class="mb-3 text-gray-700">
						Мы не продаем ваши данные. Передача возможна только партнерам, обеспечивающим работу
						сервиса:
					</p>
					<ul class="list-disc pl-4 space-y-2 text-gray-700 marker:text-gray-500">
						<li>
							<strong class="font-semibold text-gray-900">Платежные системы:</strong> (например, Robokassa/YooKassa)
							для проведения оплат.
						</li>
						<li>
							<strong class="font-semibold text-gray-900">Хостинг-провайдеры:</strong> Дата-центры, где
							размещено физическое оборудование.
						</li>
						<li>
							<strong class="font-semibold text-gray-900">Правоохранительные органы:</strong> Только при
							наличии официального судебного запроса в соответствии с законодательством.
						</li>
					</ul>
				</section>

				<section>
					<h3 class="mb-3 text-xl font-semibold text-gray-900">4. Cookies и трекинг</h3>
					<p class="text-gray-700 leading-relaxed">
						Мы используем файлы cookie для сохранения сессии авторизации (Auth Token) и настроек
						интерфейса (Тема оформления). Вы можете отключить cookie в настройках браузера, но это
						приведет к невозможности входа в личный кабинет.
					</p>
				</section>

				<section>
					<h3 class="mb-3 text-xl font-semibold text-gray-900">5. Безопасность</h3>
					<p class="text-gray-700 leading-relaxed">
						Мы используем шифрование трафика (SSL/TLS), хеширование паролей (bcrypt/argon2) и
						регулярные бэкапы баз данных. Доступ к серверам имеют только авторизованные инженеры
						через защищенный VPN-канал.
					</p>
				</section>

				<section>
					<h3 class="mb-3 text-xl font-semibold text-gray-900">6. Контакты</h3>
					<p class="text-gray-700">
						По вопросам, связанным с обработкой персональных данных, вы можете связаться с нами:
					</p>
					<ul class="mt-4 pl-4 list-disc marker:text-gray-500 space-y-2 text-gray-700">
						<li>
							<span>
								Email: <a href="mailto:privacy@yougpu.ru" class="text-blue-600 hover:underline"
									>privacy@yougpu.ru</a
								>
							</span>
						</li>
						<li>
							<span>
								Telegram: <a
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

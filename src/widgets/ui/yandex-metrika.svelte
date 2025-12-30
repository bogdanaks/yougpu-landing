<script>
	import { browser, dev } from '$app/environment';
	import { page } from '$app/state';
	import { afterNavigate } from '$app/navigation';

	const YM_ID = 105985937;

	afterNavigate(() => {
		// @ts-ignore
		if (browser && !dev && window.ym) {
			// @ts-ignore
			window.ym(YM_ID, 'hit', page.url.href);
		}
	});
</script>

<svelte:head>
	{#if browser && !dev}
		<script type="text/javascript">
			(function (m, e, t, r, i, k, a) {
				m[i] =
					m[i] ||
					function () {
						(m[i].a = m[i].a || []).push(arguments);
					};
				m[i].l = 1 * new Date();
				for (var j = 0; j < document.scripts.length; j++) {
					if (document.scripts[j].src === r) {
						return;
					}
				}
				((k = e.createElement(t)),
					(a = e.getElementsByTagName(t)[0]),
					(k.async = 1),
					(k.src = r),
					a.parentNode.insertBefore(k, a));
			})(window, document, 'script', 'https://mc.yandex.ru/metrika/tag.js?id=105985937', 'ym');

			ym(105985937, 'init', {
				clickmap: true,
				trackLinks: true,
				accurateTrackBounce: true,
				webvisor: true
			});
		</script>
	{/if}
	<meta name="yandex-verification" content="6275e0eef70e8bfb" />
</svelte:head>

<noscript>
	<div>
		<img
			src="https://mc.yandex.ru/watch/105985937"
			style="position: absolute; left: -9999px"
			alt=""
		/>
	</div>
</noscript>

<script lang="ts">
	import { browser, dev } from "$app/environment";
	import { page } from "$app/state";
	import { afterNavigate } from "$app/navigation";
	import { onMount } from "svelte";
	import { YANDEX_METRICA_COUNTER_ID, ENABLE_ANALYTICS } from "$shared/config/app-config";

	onMount(() => {
		if (!browser) return;

		if (ENABLE_ANALYTICS) {
			if (document.getElementById("ym-script")) return;

			const script = document.createElement("script");
			script.id = "ym-script";
			script.type = "text/javascript";
			script.async = true;
			script.src = `https://mc.yandex.ru/metrika/tag.js?id=${YANDEX_METRICA_COUNTER_ID}`;

			window.ym =
				window.ym ||
				function () {
					(window.ym as any).a = (window.ym as any).a || [];
					(window.ym as any).a.push(arguments);
				};
			(window.ym as any).l = 1 * new Date().getTime();

			document.head.appendChild(script);

			window.ym(YANDEX_METRICA_COUNTER_ID, "init", {
				clickmap: true,
				trackLinks: true,
				accurateTrackBounce: true,
				webvisor: true,
				transport: "beacon"
			});

			if (dev) {
				console.log(
					`%c[YM] Active ✅ ID: ${YANDEX_METRICA_COUNTER_ID}`,
					"color: #22c55e; background: #f0fdf4; font-weight: bold; padding: 2px 4px;"
				);
			}
		} else {
			window.ym = function (...args: any[]) {
				const [id, method, ...params] = args;
				if (dev) {
					console.log(
						`%c[YM Mock] ${method}`,
						"color: #eab308; background: #fffbeb; font-weight: bold; padding: 1px 4px;",
						params
					);
				}
			};

			if (dev) {
				console.log("%c[YM] Disabled via config 🛑", "color: #ef4444; font-weight: bold;");
			}
		}
	});

	afterNavigate(() => {
		if (browser && window.ym && ENABLE_ANALYTICS) {
			window.ym(YANDEX_METRICA_COUNTER_ID, "hit", page.url.href);
		}
	});
</script>

<svelte:head>
	{#if ENABLE_ANALYTICS}
		<meta name="yandex-verification" content="6275e0eef70e8bfb" />
	{/if}
</svelte:head>

{#if ENABLE_ANALYTICS}
	<noscript>
		<div>
			<img
				src={`https://mc.yandex.ru/watch/${YANDEX_METRICA_COUNTER_ID}`}
				style="position: absolute; left: -9999px"
				alt=""
			/>
		</div>
	</noscript>
{/if}

import { dev } from "$app/environment";
import { YANDEX_METRICA_COUNTER_ID } from "$shared/config/app-config";

declare global {
	interface Window {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		ym: (id: number, method: string, ...args: any[]) => void;
	}
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const reachGoal = (target: string, params?: any) => {
	if (typeof window !== "undefined" && typeof window.ym !== "undefined") {
		window.ym(YANDEX_METRICA_COUNTER_ID, "reachGoal", target, params);
		if (dev) {
			console.log(`[YM] Goal: ${target}`, params);
		}
	}
};

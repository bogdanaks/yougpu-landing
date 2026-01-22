import { dev } from "$app/environment";
import { PUBLIC_API_URL, PUBLIC_CONSOLE_URL } from "$env/static/public";

export const appConfig = {
	API_URL: PUBLIC_API_URL,
	CONSOLE_URL: PUBLIC_CONSOLE_URL
};
export const ENABLE_ANALYTICS = !dev;
export const YANDEX_METRICA_COUNTER_ID = 105985937;
export enum YANDEX_METRICA_TARGETS {
	TEST = "test",
	REGISTER = "registration_success",
	LOGIN = "login_success",
	PAYMENT = "payment_click",
	RENT_A100 = "rent_a100_click",
	RENT_H100 = "rent_h100_click"
}

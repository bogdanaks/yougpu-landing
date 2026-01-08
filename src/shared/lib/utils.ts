import currency from 'currency.js';

export const formatMoney = (value: string | number, fromCents = false, precision = 2) => {
	const money = currency(value, { fromCents, precision });
	return money.format({
		symbol: '₽',
		separator: ' ',
		decimal: '.',
		pattern: '# !',
		precision,
		negativePattern: '-# !'
	});
};

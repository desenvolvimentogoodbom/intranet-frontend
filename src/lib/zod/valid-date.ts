export function isValidDate(date: string): boolean {
	const cleaned = date.replace(/\D/g, '');

	if (cleaned.length !== 8) return false;

	const day = Number.parseInt(cleaned.substring(0, 2));
	const month = Number.parseInt(cleaned.substring(2, 4));
	const year = Number.parseInt(cleaned.substring(4, 8));

	if (month < 1 || month > 12) return false;

	const daysInMonth = new Date(year, month, 0).getDate();

	if (day < 1 || day > daysInMonth) return false;

	return true;
}

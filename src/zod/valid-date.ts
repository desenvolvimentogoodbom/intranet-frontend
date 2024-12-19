export function isValidDate(date: string): boolean {
	// Remove qualquer coisa que não seja número
	const cleaned = date.replace(/\D/g, '');

	// Verifica se a string tem 8 caracteres (formato ddmmyyyy)
	if (cleaned.length !== 8) return false;

	// Extraímos os componentes de dia, mês e ano
	const day = Number.parseInt(cleaned.substring(0, 2));
	const month = Number.parseInt(cleaned.substring(2, 4));
	const year = Number.parseInt(cleaned.substring(4, 8));

	// Verifica se o mês está dentro do intervalo válido (1 a 12)
	if (month < 1 || month > 12) return false;

	// Verifica o número de dias por mês (considerando anos bissextos)
	const daysInMonth = new Date(year, month, 0).getDate();

	// Verifica se o dia é válido para o mês
	if (day < 1 || day > daysInMonth) return false;

	return true;
}

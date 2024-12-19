export function formatDate(value: string) {
	// Remove qualquer coisa que não seja número
	const cleaned = value.replace(/\D/g, '');

	// Verifica se a string tem 8 caracteres (formato ddmmyyyy)
	if (cleaned.length === 8) {
		const match = cleaned.match(/^(\d{2})(\d{2})(\d{4})$/);
		if (match) {
			return `${match[1]}/${match[2]}/${match[3]}`;
		}
	}

	return value;
}

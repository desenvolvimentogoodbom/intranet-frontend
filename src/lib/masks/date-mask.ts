export function DateMask(value: string) {
	const cleaned = value.replace(/\D/g, '');

	if (cleaned.length === 8) {
		const match = cleaned.match(/^(\d{2})(\d{2})(\d{4})$/);
		if (match) {
			return `${match[1]}/${match[2]}/${match[3]}`;
		}
	}

	return value;
}

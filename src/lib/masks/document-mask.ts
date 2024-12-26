export function DocumentMask(value: string) {
	const cleaned = value.replace(/\D/g, '');

	if (cleaned.length === 11) {
		const match = cleaned.match(/^(\d{3})(\d{3})(\d{3})(\d{2})$/);
		if (match) {
			return `${match[1]}.${match[2]}.${match[3]}-${match[4]}`;
		}
	}

	return value;
}

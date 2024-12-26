import { readFetcher } from '@/lib/fetcher';
import Escolaridade from '@/models/escolaridade';
import Pagination from '@/models/pagination';

export async function readAllEscolaridade() {
	const { data, error } = await readFetcher<Pagination<Escolaridade>>('/escolaridade/todos', {
		query: { page: 1 },
	});

	return { data, error };
}

import { readFetcher } from '@/lib/fetcher';
import Cidade from '@/models/cidades';
import Pagination from '@/models/pagination';

export async function readAllCidades() {
	const { data, error } = await readFetcher<Pagination<Cidade>>('/cidade/todos', {
		query: { page: 1 },
	});

	return { data, error };
}

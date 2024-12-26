import { readFetcher } from '@/lib/fetcher';
import Cargo from '@/models/cargo';
import Pagination from '@/models/pagination';

export async function readAllCargos() {
	const { data, error } = await readFetcher<Pagination<Cargo>>('/cargo/todos', {
		query: { page: 1 },
	});

	return { data, error };
}

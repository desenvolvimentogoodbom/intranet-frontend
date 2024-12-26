import { createFetcher } from '@/lib/fetcher';

export interface AccessAccount {
	documento: string;
	senha: string;
}

export interface CreateAccount {
	nome: string;
	documento: string;
	telefone: string;
	cidade: number;
	escolaridade: number;
	cargo: number;
	senha: string;
	nascimento: string;
}

export interface AccessSuccess {
	token: string;
}

export async function accessAccount(dto: AccessAccount) {
	const { data, error } = await createFetcher<AccessSuccess>('/candidato/acessar', {
		body: dto,
	});

	return { data, error };
}

export async function createAccount(dto: CreateAccount) {
	const { data, error } = await createFetcher('/candidato', {
		body: dto,
	});

	return { data, error };
}

import axios, { HttpStatusCode } from 'axios';
import { API_URL } from '../../constants';

export interface CreateAccountBodyDto {
	nome: string;
	documento: string;
	telefone: string;
	cidade: number;
	escolaridade: number;
	cargo: number;
	nascimento: string;
	senha: string;
}

export interface CidadeDto {
	id: number;
	descricao: string;
}

export interface EscolaridadeDto {
	id: number;
	descricao: string;
}

export interface CargoDto {
	id: number;
	descricao: string;
}

export class CreateAccountService {
	public async readAllCidades(page: number): Promise<CidadeDto[]> {
		const params = {
			page,
		};

		try {
			const response = await axios.get(`${API_URL}cidade/todos`, { params: params });

			if (response.data?.data) {
				return response.data.data.map((item: { id: number; descricao: string }) => ({
					id: item.id,
					descricao: item.descricao,
				}));
			}

			return [];
		} catch (error) {
			throw new Error('Erro ao buscar cidades.');
		}
	}

	public async readAllEscolaridades(page: number): Promise<EscolaridadeDto[]> {
		const params = {
			page,
		};

		try {
			const response = await axios.get(`${API_URL}escolaridade/todos`, { params: params });

			if (response.data?.data) {
				return response.data.data.map((item: { id: number; descricao: string }) => ({
					id: item.id,
					descricao: item.descricao,
				}));
			}

			return [];
		} catch (error) {
			throw new Error('Erro ao buscar cidades.');
		}
	}

	public async readAllCargos(page: number): Promise<CargoDto[]> {
		const params = {
			page,
		};

		try {
			const response = await axios.get(`${API_URL}cargo/todos`, { params: params });

			if (response.data?.data) {
				return response.data.data.map((item: { id: number; descricao: string }) => ({
					id: item.id,
					descricao: item.descricao,
				}));
			}

			return [];
		} catch (error) {
			throw new Error('Erro ao buscar cidades.');
		}
	}

	public async createAccount(body: CreateAccountBodyDto): Promise<string | undefined> {
		try {
			const response = await axios.post(`${API_URL}candidato`, body);

			if ((response.status = HttpStatusCode.Created)) {
				const token = response.data.token;
				return token;
			}

			return undefined;
		} catch (error) {
			throw new Error('Erro ao se cadastrar.');
		}
	}
}

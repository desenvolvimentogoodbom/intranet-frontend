import axios, { AxiosError } from 'axios';
import { API_URL } from '../../constants';

export interface AccessAccountDto {
	documento: string;
	senha: string;
}

export interface ErrorResponseDto {
	message?: string;
}

export default class AccessAccountService {
	public async login(dto: AccessAccountDto): Promise<string> {
		try {
			const response = await axios.post(`${API_URL}candidato/acessar`, dto);

			if (response.data?.token) {
				return response.data.token;
			}

			throw new Error('Erro ao fazer login.');
		} catch (error) {
			if (axios.isAxiosError(error)) {
				const axiosError = error as AxiosError;

				if (axiosError.response) {
					const { data } = axiosError.response;
					const errorData = data as ErrorResponseDto;

					throw new Error(errorData.message);
				}
			}

			throw new Error('Erro inesperado ao tentar fazer login.');
		}
	}
}

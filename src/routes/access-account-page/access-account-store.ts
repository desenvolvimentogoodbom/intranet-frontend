import AccessAccountService, { AccessAccountDto } from './acess-account-service';
import * as z from 'zod';
import { isValidCPF } from '../../zod/valid-cpf';

export default class AccessAccountStore {
	constructor() {
		this.service = new AccessAccountService();
	}

	service: AccessAccountService;

	public getFormSchema() {
		return z.object({
			cpf: z.string().refine((value) => isValidCPF(value), {
				message: 'Por favor, insira um CPF válido.',
			}),
			password: z.string().min(6, { message: 'A senha deve ter pelo menos 6 caracteres.' }),
		});
	}

	public async login(dto: AccessAccountDto) {
		try {
			const token = await this.service.login(dto);
			return token;
		} catch (error) {
			throw error as Error;
		}
	}
}

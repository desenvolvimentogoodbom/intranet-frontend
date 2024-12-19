import * as z from 'zod';
import { isValidCPF } from '../../zod/valid-cpf';
import { CidadeDto, CreateAccountBodyDto, CreateAccountService } from './create-account-service';
import { isValidDate } from '../../zod/valid-date';

export default class CreateAccountStore {
	constructor() {
		this.service = new CreateAccountService();
	}

	service: CreateAccountService;

	private cidades: CidadeDto[] = [];

	public getCidades() {
		return this.cidades;
	}

	public getFormSchema() {
		return z
			.object({
				nome: z.string().min(5, { message: 'Nome completo deve ter pelo menos 5 caracteres.' }),
				cpf: z.string().refine((value) => isValidCPF(value), {
					message: 'Por favor, insira um CPF válido.',
				}),
				telefone: z.string().min(14, { message: 'Telefone é obrigatório.' }),
				password: z.string().min(6, { message: 'A senha deve ter pelo menos 6 caracteres.' }),
				confirmPassword: z
					.string()
					.min(6, { message: 'A confirmação da senha deve ter no mínimo 6 caracteres.' }),
				cidade: z.string().nonempty({ message: 'A cidade é obrigatória.' }),
				escolaridade: z.string().nonempty({ message: 'A escolaridade é obrigatória.' }),
				cargo: z.string().nonempty({ message: 'O cargo é obrigatória.' }),
				nascimento: z
					.string()
					.nonempty({ message: 'A data de nascimento é obrigatória.' })
					.refine((value) => isValidDate(value), {
						message: 'Por favor, insira da data de nascimento válida.',
					}),
			})
			.refine((data) => data.password === data.confirmPassword, {
				message: 'As senhas não coincidem.',
				path: ['confirmPassword'],
			});
	}

	public async readAllCidades() {
		try {
			const cidades = await this.service.readAllCidades(1);
			return cidades;
		} catch (error) {
			throw new Error('Erro ao buscar cidades.');
		}
	}

	public async readAllEscolaridades() {
		try {
			const escolaridades = await this.service.readAllEscolaridades(1);
			return escolaridades;
		} catch (error) {
			throw new Error('Erro ao buscar escolaridades.');
		}
	}

	public async readAllCargos() {
		try {
			const cargos = await this.service.readAllCargos(1);
			return cargos;
		} catch (error) {
			throw new Error('Erro ao buscar cargos.');
		}
	}

	public async createAccount(dto: CreateAccountBodyDto): Promise<boolean> {
		try {
			const token = await this.service.createAccount(dto);

			if (!token) {
				throw new Error('Erro ao criar conta, não foi possível obter o token!');
			}

			localStorage.setItem('token', token);

			return true;
		} catch (error) {
			throw new Error('Erro ao criar conta.');
		}
	}
}

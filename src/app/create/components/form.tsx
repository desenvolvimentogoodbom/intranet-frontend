'use client';

import FormFieldSelect from '@/components/ui/form-fild-select';
import { Skeleton } from '@/components/ui/skeleton';
import { Toaster } from '@/components/ui/toaster';
import { useToast } from '@/hooks/use-toast';
import Cargo from '@/models/cargo';
import Cidade from '@/models/cidades';
import ResponseError from '@/models/error-response';
import Escolaridade from '@/models/escolaridade';
import Pagination from '@/models/pagination';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '../../../components/ui/button';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from '../../../components/ui/form';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import { DateMask } from '../../../lib/masks/date-mask';
import { DocumentMask } from '../../../lib/masks/document-mask';
import { PhoneMask } from '../../../lib/masks/phone-mask';
import { isValidCPF } from '../../../lib/zod/valid-cpf';
import { isValidDate } from '../../../lib/zod/valid-date';
import { IconChevronLeft, IconDiscount, IconUserPlus } from '@tabler/icons-react';
import Link from 'next/link';
import { createAccount } from '@/services/colaborador';
import { redirect } from 'next/navigation';

interface CidadesProps {
	cidade?: Pagination<Cidade>;
	cidadeErro?: ResponseError | null;
	escolaridade?: Pagination<Escolaridade>;
	escolaridadeError?: ResponseError | null;
	cargo?: Pagination<Cargo>;
	cargoErro?: ResponseError | null;
}

export default function CreateAccountForm({ cidade: cidades, escolaridade, cargo, cidadeErro, escolaridadeError, cargoErro }: CidadesProps) {
	const { toast } = useToast();

	const formSchema = z
		.object({
			nome: z.string().min(5, { message: 'Nome deve ter pelo menos 6 caracteres.' }),
			cpf: z.string().refine((value) => isValidCPF(value), {
				message: 'Por favor, insira um CPF válido.',
			}),
			telefone: z.string().min(14, { message: 'Telefone é obrigatório.' }),
			password: z.string().min(6, { message: 'A senha deve ter pelo menos 6 caracteres.' }),
			confirmPassword: z.string().min(6, { message: 'A  senha deve ter no mínimo 6 caracteres.' }),
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

	useEffect(() => {
		if (cidadeErro) {
			toast({
				variant: 'destructive',
				title: 'Ops! Algo deu errado!',
				description: cidadeErro?.message,
			});
		}

		if (escolaridadeError) {
			toast({
				variant: 'destructive',
				title: 'Ops! Algo deu errado!',
				description: escolaridadeError?.message,
			});
		}

		if (cargoErro) {
			toast({
				variant: 'destructive',
				title: 'Ops! Algo deu errado!',
				description: cargoErro?.message,
			});
		}
	}, [cidadeErro, escolaridadeError, cargoErro])

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			nome: '',
			cpf: '',
			telefone: '',
			password: '',
			confirmPassword: '',
			cidade: '',
			escolaridade: '',
			cargo: '',
			nascimento: '',
		},
	});


	async function onSubmit(formData: z.infer<typeof formSchema>) {
		const { data, error } = await createAccount({
			nome: formData.nome,
			documento: formData.cpf,
			nascimento: formData.nascimento,
			telefone: formData.telefone,
			senha: formData.password,
			cidade: Number.parseInt(formData.cidade, 10),
			escolaridade: Number.parseInt(formData.escolaridade, 10),
			cargo: Number.parseInt(formData.escolaridade, 10),
		});

		if (error) {
			toast({
				variant: 'destructive',
				title: 'Ops! Algo deu errado!',
				description: error.message,
			});

			return;
		}

		toast({
			variant: 'success',
			title: 'Sucesso!',
			description: 'Sua conta foi criada com sucesso!',
		});

		redirect('./')
	}

	return (
		<div className="space-y-2 w-full">
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<div className="mb-4 space-y-2 ">
						<FormField
							control={form.control}
							name="nome"
							render={({ field }) => (
								<FormItem>
									<Label>Nome completo</Label>
									<FormControl>
										<Input placeholder="Goodbom Good Bom" {...field} />
									</FormControl>

									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="cpf"
							render={({ field }) => (
								<FormItem>
									<Label>CPF</Label>
									<FormControl>
										<Input
											placeholder="000.000.000-00"
											value={field.value}
											maxLength={14}
											onChange={(e) => field.onChange(DocumentMask(e.target.value))}
										/>
									</FormControl>

									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="nascimento"
							render={({ field }) => (
								<FormItem>
									<Label>Data de nascimento</Label>
									<FormControl>
										<Input
											placeholder="01/01/1991"
											value={field.value}
											maxLength={10}
											onChange={(e) => field.onChange(DateMask(e.target.value))}
										/>
									</FormControl>

									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="telefone"
							render={({ field }) => (
								<FormItem>
									<Label>Telefone</Label>
									<FormControl>
										<Input
											placeholder="(00) 00000-0000"
											value={field.value}
											maxLength={11}
											onChange={(e) => field.onChange(PhoneMask(e.target.value))}
										/>
									</FormControl>

									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="password"
							render={({ field }) => (
								<FormItem>
									<Label>Senha</Label>
									<FormControl>
										<Input type="password" placeholder="*********" {...field} />
									</FormControl>

									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="confirmPassword"
							render={({ field }) => (
								<FormItem>
									<Label>Repetir Senha</Label>
									<FormControl>
										<Input type="password" placeholder="*********" {...field} />
									</FormControl>

									<FormMessage />
								</FormItem>
							)}
						/>

						{
							cidades ? <FormField
								control={form.control}
								name="cidade"
								render={({ field }) => (
									<FormFieldSelect
										control={form.control}
										name={field.name}
										label="Cidade"
										options={cidades.data}
										valueKey="id"
										labelKey="descricao"
									/>
								)}
							/> : <div>
								<Label>Escolaridade</Label>
								<Skeleton className='w-full h-10 rounded-md' />
							</div>
						}

						{
							escolaridade ? <FormField
								control={form.control}
								name="escolaridade"
								render={({ field }) => (
									<FormFieldSelect
										control={form.control}
										name={field.name}
										label="Escolaridade"
										options={escolaridade.data ?? []}
										valueKey="id"
										labelKey="descricao"
									/>
								)}
							/> : <div>
								<Label>Escolaridade</Label>
								<Skeleton className='w-full h-10 rounded-md' />
							</div>
						}

						{
							cargo ? <FormField
								control={form.control}
								name="cargo"
								render={({ field }) => (
									<FormFieldSelect
										control={form.control}
										name={field.name}
										label="Cargo"
										options={cargo.data}
										valueKey="id"
										labelKey="descricao"
									/>
								)}
							/> : <div>
								<Label>Cargo</Label>
								<Skeleton className='w-full h-10 rounded-md' />
							</div>
						}
					</div>
					<div className='flex flex-col space-y-2'>
						<Button type="submit" className="w-full">
							<IconUserPlus />
							Cadastrar
						</Button>
						<Link href={'./'}>
							<Button variant={'primary'} className='w-full'>
								<IconChevronLeft />
								Voltar
							</Button>
						</Link>
					</div>
				</form>
			</Form>

			<Toaster />
		</div>
	);
}

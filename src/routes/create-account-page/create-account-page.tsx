import { Card, CardContent } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import Logo from '../../assets/logo_padrao.svg';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { formatPhoneNumber } from '../../masks/phone-mask';
import { formatDocument } from '../../masks/document-mask';
import { Label } from '@radix-ui/react-label';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { useToast } from '../../hooks/use-toast';
import { Toaster } from '../../components/ui/toaster';
import CreateAccountStore from './create-account-store';
import React, { useEffect, useState } from 'react';
import {
	CargoDto,
	CidadeDto,
	CreateAccountBodyDto,
	EscolaridadeDto,
} from './create-account-service';
import { formatDate } from '../../masks/date-mask';
import { Skeleton } from '../../components/ui/skeleton';
import { useNavigate } from 'react-router';

function CreateAccountPage() {
	const store = React.useMemo(() => new CreateAccountStore(), []);
	const { toast } = useToast();

	const [cidades, setCidades] = useState<CidadeDto[]>([]);
	const [cidadesLoading, setCidadesLoading] = useState<boolean>(true);

	const [escolaridades, setEscolaridades] = useState<EscolaridadeDto[]>([]);
	const [escolaridadesLoading, setEscolaridadesLoading] = useState<boolean>(true);

	const [cargos, setCargos] = useState<CargoDto[]>([]);
	const [cargosLoading, setCargosLoading] = useState<boolean>(true);

	const navigate = useNavigate();

	useEffect(() => {
		store
			.readAllCidades()
			.then((cidadeList) => {
				setCidades(cidadeList);
				setCidadesLoading(false);
			})
			.catch((_) => {
				setCidadesLoading(false);
				toast({
					variant: 'destructive',
					title: 'Ops! Algo deu errado.',
					description: 'Não foi possível carregar as cidades. Tente novamente mais tarde.',
				});
			});
	}, []);

	useEffect(() => {
		store
			.readAllEscolaridades()
			.then((escolaridadeList) => {
				setEscolaridades(escolaridadeList);
				setEscolaridadesLoading(false);
			})
			.catch((_) => {
				setEscolaridadesLoading(false);
				toast({
					variant: 'destructive',
					title: 'Ops! Algo deu errado.',
					description: 'Não foi possível carregar as escolaridades. Tente novamente mais tarde.',
				});
			});
	}, []);

	useEffect(() => {
		store
			.readAllCargos()
			.then((cargosList) => {
				setCargos(cargosList);
				setCargosLoading(false);
			})
			.catch((_) => {
				setCargosLoading(false);
				toast({
					variant: 'destructive',
					title: 'Ops! Algo deu errado.',
					description: 'Não foi possível carregar os cargos. Tente novamente mais tarde.',
				});
			});
	}, []);

	const formSchema = store.getFormSchema();
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

	async function onSubmit(data: z.infer<typeof formSchema>) {
		const dto: CreateAccountBodyDto = {
			nome: data.nome,
			documento: data.cpf,
			telefone: data.telefone,
			cidade: Number.parseInt(data.cidade),
			escolaridade: Number.parseInt(data.escolaridade),
			cargo: Number.parseInt(data.cargo),
			nascimento: data.nascimento,
			senha: data.password,
		};

		try {
			await store.createAccount(dto);

			toast({
				variant: 'success',
				title: 'Conta criada com sucesso!',
				description: 'Agora você já pode acessar o sistema.',
			});

			setTimeout(() => {
				navigate('../');
			}, 2000);
		} catch (error) {
			toast({
				variant: 'destructive',
				title: 'Ops! Algo deu errado.',
				description: 'Não foi possível se cadastrar no sistema. Tente novamente mais tarde.',
			});
		}
	}

	return (
		<>
			<div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10 bg-conta bg-cover bg-center">
				<Card className="min-w-80 md:min-w-[400px]">
					<CardContent>
						<div className="flex justify-center mb-8">
							<img src={Logo} alt="" className="max-w-44" />
						</div>

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
														onChange={(e) => field.onChange(formatDocument(e.target.value))}
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
														onChange={(e) => field.onChange(formatDate(e.target.value))}
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
														onChange={(e) => field.onChange(formatPhoneNumber(e.target.value))}
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

									<FormField
										control={form.control}
										name="cidade"
										render={({ field }) => (
											<FormItem>
												<Label>Cidade</Label>
												<FormControl>
													{cidadesLoading ? (
														<Skeleton className="h-10 w-full rounded-md" />
													) : (
														<Select onValueChange={field.onChange} defaultValue={field.value}>
															<FormControl>
																<SelectTrigger>
																	<SelectValue placeholder="Selecione a sua cidade" />
																</SelectTrigger>
															</FormControl>
															<SelectContent>
																{cidades.map((cidade) => (
																	<SelectItem key={cidade.id} value={cidade.id.toString()}>
																		{cidade.descricao}
																	</SelectItem>
																))}
															</SelectContent>
														</Select>
													)}
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>

									<FormField
										control={form.control}
										name="escolaridade"
										render={({ field }) => (
											<FormItem>
												<Label>Escolaridade</Label>
												<FormControl>
													{escolaridadesLoading ? (
														<Skeleton className="h-10 w-full rounded-md" />
													) : (
														<Select onValueChange={field.onChange} defaultValue={field.value}>
															<FormControl>
																<SelectTrigger>
																	<SelectValue placeholder="Selecione a sua escolaridade" />
																</SelectTrigger>
															</FormControl>
															<SelectContent>
																{escolaridades.map((escolaridade) => (
																	<SelectItem
																		key={escolaridade.id}
																		value={escolaridade.id.toString()}
																	>
																		{escolaridade.descricao}
																	</SelectItem>
																))}
															</SelectContent>
														</Select>
													)}
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>

									<FormField
										control={form.control}
										name="cargo"
										render={({ field }) => (
											<FormItem>
												<Label>Cargos</Label>
												<FormControl>
													{cargosLoading ? (
														<Skeleton className="h-10 w-full rounded-md" />
													) : (
														<Select onValueChange={field.onChange} defaultValue={field.value}>
															<FormControl>
																<SelectTrigger>
																	<SelectValue placeholder="Selecione o seu cargo" />
																</SelectTrigger>
															</FormControl>
															<SelectContent>
																{cargos.map((cargo) => (
																	<SelectItem key={cargo.id} value={cargo.id.toString()}>
																		{cargo.descricao}
																	</SelectItem>
																))}
															</SelectContent>
														</Select>
													)}
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>
								<Button type="submit" className="w-full">
									Cadastrar
								</Button>
							</form>
						</Form>
						<Button
							type="submit"
							className="w-full mt-2"
							variant={'secondary'}
							onClick={() => navigate('../')}
						>
							Voltar
						</Button>
					</CardContent>
				</Card>
			</div>
			<Toaster />
		</>
	);
}

export default CreateAccountPage;

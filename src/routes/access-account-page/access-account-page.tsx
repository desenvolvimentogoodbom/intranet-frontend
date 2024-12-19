import { Card, CardContent } from '../../components/ui/card';
import { Label } from '@radix-ui/react-label';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import Logo from '../../assets/logo_padrao.svg';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { formatDocument } from '../../masks/document-mask';
import { useNavigate } from 'react-router';
import React from 'react';
import AccessAccountStore from './access-account-store';
import { useToast } from '../../hooks/use-toast';
import { AccessAccountDto } from './acess-account-service';
import { Toaster } from '../../components/ui/toaster';

function AccessAccountPage() {
	const store = React.useMemo(() => new AccessAccountStore(), []);
	const { toast } = useToast();
	const navigate = useNavigate();

	const formSchema = store.getFormSchema();
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			cpf: '',
			password: '',
		},
	});

	async function onSubmit(data: z.infer<typeof formSchema>) {
		const dto: AccessAccountDto = {
			documento: data.cpf,
			senha: data.password,
		};

		try {
			await store.login(dto);

			toast({
				variant: 'success',
				title: 'Sucesso!',
				description: 'Login aprovado, acessando o sistema.',
			});

			setTimeout(() => {
				navigate('./home');
			}, 2000);
		} catch (error) {
			if (error instanceof Error) {
				toast({
					variant: 'destructive',
					title: 'Ops! Algo deu errado.',
					description: `${error.message}`,
				});
			} else {
				toast({
					variant: 'destructive',
					title: 'Ops! Algo deu errado.',
					description: 'Erro desconhecido ao acessar o sistema.',
				});
			}
		}
	}

	return (
		<>
			<div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10 bg-conta bg-cover bg-center">
				<Card className="min-w-80 md:min-w-96">
					<CardContent>
						<div className="flex justify-center mb-8">
							<img src={Logo} alt="" className="max-w-44" />
						</div>

						<Form {...form}>
							<form onSubmit={form.handleSubmit(onSubmit)}>
								<div className="mb-4 space-y-2">
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
								</div>
								<Button type="submit" className="w-full">
									Acessar
								</Button>
							</form>
						</Form>
						<Button
							type="submit"
							className="w-full mt-2"
							variant={'secondary'}
							onClick={() => navigate('./criar-conta')}
						>
							Cadastre aqui
						</Button>
					</CardContent>
				</Card>
			</div>
			<Toaster />
		</>
	);
}

export default AccessAccountPage;

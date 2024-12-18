import { Card, CardContent } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import Logo from '../assets/logo_padrao.svg';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { formatPhoneNumber } from '../masks/phone-mask';
import { formatDocument } from '../masks/document-mask';
import { Label } from '@radix-ui/react-label';

const formSchema = z
	.object({
		fullName: z.string().min(5, { message: 'Nome completo deve ter pelo menos 5 caracteres.' }),
		document: z.string().refine(
			(val) => {
				const cleaned = val.replace(/\D/g, '');
				return cleaned.length === 11 || cleaned.length === 14;
			},
			{
				message: 'O documento deve ser um CPF ou CNPJ válido.',
			},
		),
		phone: z.string().min(14, { message: 'Telefone é obrigatório.' }),
		password: z.string().min(6, { message: 'A senha deve ter no mínimo 6 caracteres.' }),
		confirmPassword: z
			.string()
			.min(6, { message: 'A confirmação da senha deve ter no mínimo 6 caracteres.' }),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: 'As senhas não coincidem.',
		path: ['confirmPassword'],
	});

function onSubmit(values: z.infer<typeof formSchema>) {
	console.log(values);
}

function CreateAccountPage() {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			fullName: '',
			document: '',
			phone: '',
			password: '',
			confirmPassword: '',
		},
	});

	return (
		<>
			<div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10 bg-conta bg-cover bg-center">
				<div className="flex w-full max-w-sm flex-col gap-6">
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
											name="fullName"
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
											name="document"
											render={({ field }) => (
												<FormItem>
													<Label>Documento</Label>
													<FormControl>
														<Input
															placeholder="000.000.000-00"
															value={field.value}
															maxLength={11}
															onChange={(e) => field.onChange(formatDocument(e.target.value))}
														/>
													</FormControl>

													<FormMessage />
												</FormItem>
											)}
										/>

										<FormField
											control={form.control}
											name="phone"
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
													<Label>Repetir a Senha</Label>
													<FormControl>
														<Input type="password" placeholder="*********" {...field} />
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

							<div className="mt-4 text-center text-sm">
								<Label>Você já tem uma conta? </Label>
								<a href="./" className="underline underline-offset-4">
									Acessar aqui
								</a>
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		</>
	);
}

export default CreateAccountPage;

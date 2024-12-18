import { Card, CardContent } from '../components/ui/card';
import { Label } from '@radix-ui/react-label';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import Logo from '../assets/logo_padrao.svg';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { formatDocument } from '../masks/document-mask';

const formSchema = z.object({
	cpf: z.string().email({ message: 'Por favor, insira um CPF válido.' }),
	password: z.string().min(6, { message: 'A senha deve ter pelo menos 6 caracteres.' }),
});

function onSubmit(values: z.infer<typeof formSchema>) {
	console.log(values);
}

function AccessAccountPage() {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			cpf: '',
			password: '',
		},
	});

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

						<div className="mt-4 text-center text-sm">
							Você não tem uma conta?{' '}
							<a href="./criar-conta" className="underline underline-offset-4">
								Cadastre aqui
							</a>
						</div>
					</CardContent>
				</Card>
			</div>
		</>
	);
}

export default AccessAccountPage;

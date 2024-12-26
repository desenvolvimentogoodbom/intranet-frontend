'use client';

import { useToast } from '@/hooks/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
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
import { DocumentMask } from '../../../lib/masks/document-mask';
import { isValidCPF } from '../../../lib/zod/valid-cpf';
import { IconLogin, IconUserPlus } from '@tabler/icons-react';
import Link from 'next/link';
import { accessAccount } from '@/services/colaborador';
import { Toaster } from '@/components/ui/toaster';
import { redirect } from 'next/navigation';

export default function AccessAccountForm() {
	const { toast } = useToast();

	const formSchema = z.object({
		cpf: z.string().refine((value) => isValidCPF(value), {
			message: 'Por favor, insira um CPF válido.',
		}),
		password: z.string().min(6, { message: 'A senha deve ter pelo menos 6 caracteres.' }),
	});

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			cpf: '',
			password: '',
		},
	});


	async function onSubmit(formData: z.infer<typeof formSchema>) {
		const { data, error } = await accessAccount({
			documento: formData.cpf,
			senha: formData.password,
		});

		if (error) {
			toast({
				variant: 'destructive',
				title: 'Ops! Algo deu errado!',
				description: error.message,
			});

			return;
		}

		if (data?.token) {
			localStorage.setItem('token', data.token);
		}

		redirect('./home')
	}

	return (
		<>
			<div className="space-y-2 w-full">
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)}>
						<div className="mb-4 space-y-2 w-full">
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

						<div className="space-y-2 flex flex-col ">
							<Button type="submit" className="w-full">
								<IconLogin />
								Acessar
							</Button>

							<Link href={'/create'}>
								<Button type="button" className="w-full" variant={'primary'}>
									<IconUserPlus />
									Cadastrar
								</Button>
							</Link>
						</div>
					</form>
				</Form>

				<Toaster />
			</div>
		</>
	);
}

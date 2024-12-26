import { IconDiscount, IconShoppingCart } from '@tabler/icons-react';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import AccessAccountForm from './components/form';

export default function Root() {

	return (
		<>
			<div className="relative h-screen w-full">
				<div className="absolute top-0 left-0 w-full h-full bg-blue-500 clip-triangle" />
				<div className="relative z-10 flex justify-center items-center h-full">
					<Card className="min-w-80 md:min-w-80">
						<CardContent className="w-full h-full flex flex-col justify-center items-center">
							<Image
								src="/logos/logo-padrao.svg"
								alt="Logo Goodbom Supermercados"
								width={180}
								height={38}
								priority
								className="mb-4"
							/>

							<AccessAccountForm />

							<div className='w-full'>
								<div className='py-2 my-3'>
									<Separator />
								</div>

								<div className='flex flex-col space-y-2 w-full'>
									<a href="https://www.goodbom.com.br/" target="_blank" rel="noopener noreferrer">
										<Button variant={'outline'} className='w-full'>
											<IconShoppingCart />
											Acessar a Loja Virtual
										</Button>
									</a>
									<a href="https://institucional.goodbom.com.br/jornal-de-ofertas/" target="_blank" rel="noopener noreferrer">
										<Button variant={'outline'} className='w-full'>
											<IconDiscount />
											Acessar Ofertas
										</Button>
									</a>
								</div>
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		</>
	);
}

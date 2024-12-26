import Image from 'next/image';
import { Card, CardContent } from '../../components/ui/card';
import CreateAccountForm from './components/form';
import { readAllCidades } from '@/services/cidade';
import { readAllCargos } from '@/services/cargos';
import { readAllEscolaridade } from '@/services/escolaridade';

export default async function CreatePage() {
	const { data: cidades, error: cidadeError } = await readAllCidades();
	const { data: escolaridades, error: escolaridadeError } = await readAllEscolaridade();
	const { data: cargos, error: cargoError } = await readAllCargos();

	return (
		<>
			<div>
				<div className="relative w-full">
					<div className="absolute top-0 left-0 w-full h-full bg-blue-500 clip-triangle" />
					<div className="relative z-10 flex justify-center items-center h-full">
						<Card className="min-w-80 md:min-w-80 my-10">
							<CardContent className="w-full h-full flex flex-col justify-center items-center">
								<Image
									src="/logos/logo-padrao.svg"
									alt="Logo Goodbom Supermercados"
									width={180}
									height={38}
									priority
									className="mb-4"
								/>

								<CreateAccountForm cidade={cidades} escolaridade={escolaridades} cargo={cargos} escolaridadeError={escolaridadeError} />
							</CardContent>
						</Card>
					</div>
				</div>
			</div>
		</>
	);
}

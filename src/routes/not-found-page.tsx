import Footer from '../components/ui/footer';
import { Button } from '@/components/ui/button';
import { IconChevronLeft } from '@tabler/icons-react';
import NotFound from '../assets/404.svg';

function NotFoundAccountPage() {
	return (
		<>
			<div className="flex flex-col justify-between items-center h-screen">
				<div className="w-full h-full flex flex-col items-center justify-center">
					<img
						src={NotFound}
						alt="Usuário sentado com um computador e no computador uma página 404"
						className="max-w-96 md:max-w-[600px]"
					/>
					<a href="./">
						<Button>
							<IconChevronLeft stroke={4} />
							Voltar para a home
						</Button>
					</a>
				</div>
				<Footer />
			</div>
		</>
	);
}

export default NotFoundAccountPage;

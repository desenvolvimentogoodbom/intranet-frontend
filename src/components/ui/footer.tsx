import { Label } from '@radix-ui/react-label';

function Footer() {
	return (
		<footer className="w-full bg-good-blue p-4 flex justify-center">
			<Label className="text-center font-normal text-white">
				&copy; Goodbom Supermercados - Todos os direitos reservados.
			</Label>
		</footer>
	);
}

export default Footer;

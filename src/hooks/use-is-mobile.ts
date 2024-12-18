import { useState, useEffect } from 'react';

function useIsMobile(): boolean {
	const [isMobile, setIsMobile] = useState<boolean>(false);

	useEffect(() => {
		const handleResize = () => {
			const mobileWidthThreshold = 768;
			setIsMobile(window.innerWidth <= mobileWidthThreshold);
		};

		handleResize();

		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	return isMobile;
}

export default useIsMobile;

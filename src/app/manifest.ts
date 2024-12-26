import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
	return {
		name: 'GoodJobs',
		short_name: 'GoodJobs',
		description: 'GoodJobs a plataforma de vagas do GoodbomSupermercados.',
		start_url: '/',
		display: 'standalone',
		background_color: '#ffffff',
		theme_color: '#1F578E',
		orientation: 'portrait',
		icons: [
			{
				src: '/icon-192x192.png',
				sizes: '192x192',
				type: 'image/png',
			},
			{
				src: '/icon-512x512.png',
				sizes: '512x512',
				type: 'image/png',
			},
		],
	};
}

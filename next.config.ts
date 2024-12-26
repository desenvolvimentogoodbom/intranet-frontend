import type { NextConfig } from 'next';
import withSerwistInit from '@serwist/next';

const revision = crypto.randomUUID();

const withSerwist = withSerwistInit({
	cacheOnNavigation: true,
	swSrc: 'app/sw.ts',
	swDest: 'public/sw.js',
	additionalPrecacheEntries: [{ url: '/offline', revision }],
});

const nextConfig: NextConfig = {
	reactStrictMode: false,
};

export default nextConfig;

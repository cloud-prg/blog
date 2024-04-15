/** @type {import('next').NextConfig} */
import { proxySuffix } from './setupProxy.js'

const nextConfig = {
    reactStrictMode: false,
    output: 'standalone',
    async rewrites() {
        return [
            {
                source: '/dev/:path*',
                destination: proxySuffix + "/:path*",
            },
            {
                source: '/prod/:path*',
                destination: proxySuffix + "/:path*",
            },
        ];
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**.com',
                // port: '',
                // pathname: '/*/**',
            },
        ],
    },
};

export default nextConfig;

/** @type {import('next').NextConfig} */
import { proxySuffix } from './setupProxy.js'
import  { codeInspectorPlugin } from 'code-inspector-plugin';

const nextConfig = {
    reactStrictMode: false,
    output: 'standalone',
    webpack: (config, { dev, isServer }) => {
        config.plugins.push(codeInspectorPlugin({ bundler: 'webpack' }));
        return config;
      },
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

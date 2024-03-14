/** @type {import('next').NextConfig} */
const serverMap = {
    dev: 'http://localhost:3002/api',
    prod: 'http://localhost:3002/api',
};

const nextConfig = {
    reactStrictMode: false,
    async rewrites() {
        const env = process.env.NODE_ENV === 'development' ? 'dev' : 'prod';

        return [
            {
                source: '/dev/:path*',
                destination: serverMap[env] + "/:path*",
            },
            {
                source: '/prod/:path*',
                destination: serverMap[env] + "/:path*",
            },
        ];
    },

};

export default nextConfig;

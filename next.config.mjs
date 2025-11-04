/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [{
            protocol: 'https',
            hostname: 'api.citomed.az',
            port: '',
            pathname: '/storage/**',
        }, ],
    },
    async redirects() {
        return [{
            source: '/',
            destination: '/az',
            permanent: true,
        }, ];
    },
    reactStrictMode: false,
    experimental: {
        optimizePackageImports: ["@chakra-ui/react"],
    },

};

export default nextConfig;
import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
    ],
  },
  // This is needed for the Google Sign-in button to render correctly
  experimental: {
    serverComponentsExternalPackages: ['@react-oauth/google'],
  },
  // Ignore the manifest file during build
  webpack: (config) => {
    config.resolve.alias['./manifest.json'] = false;
    return config;
  },
};

export default nextConfig;

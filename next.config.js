// eslint-disable-next-line @typescript-eslint/no-var-requires
const { withNextVideo } = require('next-video/process');
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
        pathname: '/.*/**',
      },
      {
        protocol: 'http',
        hostname: '**',
        pathname: '/.*/**',
      },
    ],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = withNextVideo(nextConfig, { provider: 'vercel-blob' });

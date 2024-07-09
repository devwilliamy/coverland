// eslint-disable-next-line @typescript-eslint/no-var-requires
const { withNextVideo } = require('next-video/process');
// eslint-disable-next-line @typescript-eslint/no-var-requires
// const withBundleAnalyzer = require('@next/bundle-analyzer')({
//   enabled: process.env.ANALYZE === 'true',
// });

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,

  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'coverland.com',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: '**.coverland.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '**.coverland.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'coverland.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '91.108.110.247',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'devstaging.shop',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'coverland.sfo3.cdn.digitaloceanspaces.com',
        pathname: '/**',
      },
    ],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  productionBrowserSourceMaps: true,
};

module.exports = withNextVideo(nextConfig, { provider: 'vercel-blob' });

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { withNextVideo } = require('next-video/process');
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '**.coverland.com',
      },
    ],
  },
  typescript: {
    ignoreBuildErrors: false,
  },
};

module.exports = withNextVideo(nextConfig);

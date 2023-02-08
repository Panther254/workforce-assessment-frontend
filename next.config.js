/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: process.env.BASE_URL,
      },
    ],
  },
}

module.exports = nextConfig

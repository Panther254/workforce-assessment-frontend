/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'https://res.cloudinary.com',
      },
    ],
  },
}

module.exports = nextConfig



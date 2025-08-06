/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: 'standalone',
  compiler: {
    styledComponents: true,
  },
  images: {
    domains: ['images.pexels.com', 'firebasestorage.googleapis.com'],
  },
}

module.exports = nextConfig
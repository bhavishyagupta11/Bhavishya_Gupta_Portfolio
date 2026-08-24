/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['github.com', 'avatars.githubusercontent.com', 'ghchart.rshah.org'],
    unoptimized: true,
  },
};

export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  // Next 15 started linting during builds; style-only lint errors shouldn't block a deploy
  eslint: { ignoreDuringBuilds: true },
};

export default nextConfig;

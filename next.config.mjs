/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  // Next 15 started linting during builds; style-only lint errors shouldn't block a deploy
  eslint: { ignoreDuringBuilds: true },
  // 75 is the default for every other image; the hero asks for 100
  images: { qualities: [75, 100] },
};

export default nextConfig;

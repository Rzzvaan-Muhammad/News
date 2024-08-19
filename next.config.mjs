/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  output: 'standalone',
  eslint: {
    dirs: ['app', 'components', 'hooks', 'constants', 'contexts', 'utils'],
  },
};

export default nextConfig;

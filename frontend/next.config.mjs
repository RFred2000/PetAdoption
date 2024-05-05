/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/',
        destination: '/pets',
      },
    ];
  },
};

export default nextConfig;

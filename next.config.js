/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  async rewrites() {
    return [
      {
        source: '/flags/:slug',
        destination: 'https://flagcdn.com/w40/:slug',
      },
    ];
  },
};

module.exports = nextConfig;

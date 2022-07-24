/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  /*
  async rewrites() {
    return [
      {
        source: '/flags/:slug.png',
        destination: 'https://countryflagsapi.com/png/:slug',
      },
    ];
  },
  */
};

module.exports = nextConfig;

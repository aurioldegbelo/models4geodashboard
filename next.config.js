/** @type {import('next').NextConfig} */
const nextTranslate = require("next-translate-plugin")

const nextConfig = {
  reactStrictMode: true,
}

module.exports = nextConfig

module.exports = {
  typescript: {
    ignoreBuildErrors: true 
  },
  ...nextTranslate(),
  async redirects() {
    return [
      {
        source: '/',
        destination: '/dashboard/v1',
        permanent: true,
      },
    ];
  },
};

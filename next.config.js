/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async redirects(){
    return [
      {
        source: '/login',
        destination: '/',
        permanent: true,
      },
      {
        source: '/404',
        destination: '/',
        permanent: true,
      },
    ]
  }
}

module.exports = nextConfig

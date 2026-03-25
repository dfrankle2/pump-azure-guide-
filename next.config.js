/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/',
        destination: '/flowchart.html',
        permanent: false,
      },
    ]
  },
}

module.exports = nextConfig

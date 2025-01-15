const nextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/home',
        permanent: true,
      },
    ]
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ['sung-won-chat.s3.ap-northeast-2.amazonaws.com'],
  },
}
export default nextConfig

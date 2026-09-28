// 課題で扱う画像のURLを登録する方法
// next.config.js

const nextConfig = {
  images: {
    dangerouslyAllowLocalIP: process.env.NODE_ENV === "development",
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.microcms-assets.io',
        port: '',
        pathname: '/**',
      }
    ],
  },
}

module.exports = nextConfig;
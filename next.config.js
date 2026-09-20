// 課題で扱う画像のURLを登録する方法
// next.config.js

const nextConfig = {
  images: {
    dangerouslyAllowLocalIP: process.env.NODE_ENV === "development",
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.jp',
        port: '',
        pathname: '/**',
      }
    ],
  },
}

module.exports = nextConfig;
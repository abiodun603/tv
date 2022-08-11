/** @type {import('next').NextConfig} */
const env = {
  BASE_URL: process.env.BASE_URL,
};

const nextConfig = {
  env,
  reactStrictMode: true,
  swcMinify: true,
  // experimental: {
  //   forceSwcTransforms: true,
  // },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
};

module.exports = nextConfig;

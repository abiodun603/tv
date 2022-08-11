/** @type {import('next').NextConfig} */
const env = {
  BASE_URL: process.env.BASE_URL,
};

const nextConfig = {
  env,
  reactStrictMode: true,
  swcMinify: true,
};

module.exports = nextConfig;

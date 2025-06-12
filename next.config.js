/** @type {import('next').NextConfig} */
const path = require("path");

const nextConfig = {
  reactStrictMode: true,
  experimental: {
    // appDir: true,
  },
  webpack(config) {
    config.resolve.alias["@"] = path.resolve(__dirname, "app");
    return config;
  },
};

module.exports = nextConfig;

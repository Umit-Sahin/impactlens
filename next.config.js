// next.config.js

const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.resolve.alias['@'] = path.resolve(__dirname, 'app');
    config.resolve.alias['@lib'] = path.resolve(__dirname, 'lib');
    return config;
  },
};

module.exports = nextConfig;

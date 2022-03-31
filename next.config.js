/* eslint-disable */
const withPlugins = require('next-compose-plugins');
const withOptimizedImages = require('next-optimized-images');

const nextConfig = {
  webpack: (config) => {
    config.node = {
      fs: 'empty',
    };

    return config;
  },
  experimental: {
    // https://nextjs.org/docs/advanced-features/output-file-tracing#automatically-copying-traced-files-experimental
    outputStandalone: true,
  },
};

module.exports = withPlugins(
  [
    withOptimizedImages({
      optimizeImages: false,
    }),
  ],
  nextConfig
);

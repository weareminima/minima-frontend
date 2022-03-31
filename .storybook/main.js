const path = require('path');

module.exports = {
  stories: [
    '../docs/**/*.stories.@(js|jsx|ts|tsx|mdx)',
    '../components/**/*.stories.@(js|jsx|ts|tsx)',
    '../containers/**/*.stories.@(js|jsx|ts|tsx)',
  ],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
  /* nextjs -> no need to import React and can use alias modules */
  webpackFinal: async (config) => {
    // *************************
    // RESOLVE node_modules
    // If you want to add a directory to search in that takes precedence over node_modules/:
    // https://webpack.js.org/configuration/resolve/#resolvemodules
    config.resolve.modules = [path.resolve(__dirname, '..'), 'node_modules'];

    // *************************
    // SVGS
    // Remove how storybook is handling the svgs. They are using file-loader
    // https://github.com/JetBrains/svg-sprite-loader/issues/267
    config.module.rules = config.module.rules.map((rule) => {
      if (rule.test.toString().includes('svg')) {
        const test = rule.test.toString().replace('svg|', '').replace(/\//g, '');
        return { ...rule, test: new RegExp(test) };
      } else {
        return rule;
      }
    });

    // Add custom loaders for svgs
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: 'svg-sprite-loader',
          options: {
            extract: false,
          },
        },
        {
          loader: 'svgo-loader',
          options: {
            plugins: [
              { removeTitle: true },
              { convertColors: { shorthex: false } },
              { convertPathData: false },
            ],
          },
        },
      ],
    });

    return config;
  },
};

const path = require('path');

module.exports = {
  module: {
    rules: [
      {
        test: /\.stories\.ts$/,
        loaders: [
          {
            loader: require.resolve('@storybook/addon-storysource/loader'),
            options: {
              parser: 'typescript',
              prettierConfig: {
                printWidth: 80
              }
            }
          }
        ],
        enforce: 'pre',
      },
      {
        test: /\.svg$/,
        loader: 'svg-inline-loader'
      }
    ]
  }
};
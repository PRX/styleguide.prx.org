const path = require('path');

module.exports = {
  module: {
    rules: [
      {
        test: /^[^\.]+\.s?css$/,
        loaders: ['to-string-loader', 'css-loader', 'sass-loader'],
        include: path.resolve(__dirname, '../')
      },
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
      }
    ]
  }
};
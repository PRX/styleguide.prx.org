const path = require('path');

module.exports = {
  module: {
    rules: [
      {
        test: /^[^\.]+\.s?css$/,
        loaders: ['to-string-loader', 'css-loader', 'sass-loader'],
        include: path.resolve(__dirname, '../')
      }
    ]
  }
};
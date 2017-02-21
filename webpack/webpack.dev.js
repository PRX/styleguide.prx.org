'use strict';

const HtmlWebpack = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
const ChunkWebpack = webpack.optimize.CommonsChunkPlugin;

const rootDir = path.resolve(__dirname, '..');

module.exports = {
  devServer: {
    contentBase: path.resolve(rootDir, 'dist'),
    port: 9000
  },
  devtool: 'source-map',
  entry: {
    app: [path.resolve(rootDir, 'src', 'bootstrap')],
    vendor: [path.resolve(rootDir, 'src', 'vendor')],
  },
  module: {
    rules: [
      {loader: 'raw-loader', test: /\.(css|html)$/},
      {
        exclude: /node_modules/,
        test: /\.ts$/,
        loaders: [
          'awesome-typescript-loader?configFileName=' + path.resolve(rootDir, 'tsconfig.json'),
          'angular2-template-loader?keepUrl=true'
        ]
      },
      {enforce: 'pre', exclude: /node_modules/, loader: 'tslint-loader', test: /\.ts$/}
    ]
  },
  plugins: [
    new ChunkWebpack({
      filename: 'vendor.bundle.js',
      minChunks: Infinity,
      name: 'vendor'
    }),
    new HtmlWebpack({
      filename: 'index.html',
      inject: 'body',
      template: path.resolve(rootDir, 'src', 'index.html')
    })
  ],
  resolve: {
    extensions: ['.js', '.ts']
  }
};

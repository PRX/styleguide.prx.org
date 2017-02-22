'use strict';

const HtmlWebpack = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
const ChunkWebpack = webpack.optimize.CommonsChunkPlugin;
const ContextReplacement = webpack.ContextReplacementPlugin;
var ExtractTextPlugin = require('extract-text-webpack-plugin');

const rootDir = path.resolve(__dirname, '..');

module.exports = {
  devServer: {
    contentBase: path.resolve(rootDir, 'dist'),
    port: 9000
  },
  devtool: 'source-map',
  entry: {
    app: [path.resolve(rootDir, 'src', 'bootstrap')],
    vendor: [path.resolve(rootDir, 'src', 'vendor')]
  },
  output: {
    path: path.resolve(rootDir, 'dist'),
    filename: '[name].js',
    chunkFilename: '[id].js'
  },
  module: {
    rules: [
      {test: '/.*src\/styles\.css$/', loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader' })},
      {test: '/pikaday\/css\/(pikaday|triangle)\.css$/', loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader' })},
      {test: /components\/.*\.(css|html)$/, loader: 'raw-loader'},
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
    }),
    new ContextReplacement(
      /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
      rootDir
    ),
    new ExtractTextPlugin({
      filename: '[name].css',
      disable: false,
      allChunks: true
    })
  ],
  resolve: {
    extensions: ['.js', '.ts']
  }
};

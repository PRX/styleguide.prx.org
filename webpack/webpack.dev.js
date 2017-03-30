'use strict';

const HtmlWebpack = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
const ChunkWebpack = webpack.optimize.CommonsChunkPlugin;
const ContextReplacement = webpack.ContextReplacementPlugin;
const ExtractTextPlugin = require('extract-text-webpack-plugin');

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
    publicPath: '/dist/',
    filename: '[name].js',
    chunkFilename: '[id].js'
  },
  module: {
    rules: [
      {test: /\.html$/, include: path.resolve(rootDir, 'src', 'app'), loader: 'raw-loader'},
      {test: /\.css$/, include: path.resolve(rootDir, 'src', 'app'), loaders: ['to-string-loader', 'css-loader']},
      {test: /\.css/, include: path.resolve(rootDir, 'node_modules', 'chart.prx.org'), loaders: ['to-string-loader', 'css-loader']},
      {test: /global-styles\.css$/, use: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader' })},
      {
        test: /(pikaday|triangle)\.css$/,
        include: path.resolve(rootDir, 'node_modules', 'pikaday', 'css'),
        use: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader' })
      },
      {
        test: /c3\.css$/,
        include: path.resolve(rootDir, 'node_modules', 'c3'),
        use: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader' })
      },
      {
        test: /\.ts$/,
        loaders: [
          'awesome-typescript-loader?configFileName=' + path.resolve(rootDir, 'tsconfig.json'),
          'angular2-template-loader'
        ]
      },
      {test: /\.(svg)$/, loader: 'url-loader'},
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
    /* because WARNING: Critical dependency: the request of a dependency is an expression */
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
    extensions: ['.js', '.ts'],
    modules: [path.join(rootDir, 'node_modules')]
  }
};

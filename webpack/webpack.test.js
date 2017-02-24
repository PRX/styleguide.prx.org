'use strict';

const path = require('path');
const webpack = require('webpack');

const ContextReplacementPlugin = webpack.ContextReplacementPlugin;
const LoaderOptionsPlugin = webpack.LoaderOptionsPlugin;
const SourceMapDevToolPlugin = webpack.SourceMapDevToolPlugin;

const rootDir = process.cwd();

module.exports = {
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.ts$/,
        loaders: [
          'awesome-typescript-loader?configFileName=' + path.resolve(rootDir, 'tsconfig.json'),
          'angular2-template-loader?keepUrl=true'
        ]
      },
      {loader: 'raw-loader', test: /\.(css|html)$/},
      {enforce: 'pre', exclude: /node_modules/, loader: 'tslint-loader', test: /\.ts$/}
    ]
  },
  resolve: {
    extensions: ['.js', '.ts'],
    modules: [path.resolve('.', 'src'), path.resolve(rootDir, 'node_modules')],
    moduleExtensions: ['-loader']
  },
  plugins: [
    new ContextReplacementPlugin(
      /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
      __dirname
    ),
    new LoaderOptionsPlugin({
      options: {
        emitErrors: true
      }
    }),
    new SourceMapDevToolPlugin({
      filename: null,
      test: /\.ts$/
    })
  ]
};
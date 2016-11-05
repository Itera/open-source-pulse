/* eslint-disable import/no-extraneous-dependencies */
const webpack = require('webpack');
require('babel-register');

module.exports = (options) => {
  return {
    devtool: options.dev ? 'cheap-module-eval-source-map' : 'hidden-source-map',
    entry: { bundle: './frontend/index.js' },
    output: {
      path: './dist',
      filename: '[name].js',
      publicPath: '/',
    },
    plugins: [
      new webpack.ProvidePlugin({ Promise: 'bluebird' }),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      }),
    ].concat(
      options.dev ? [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
      ] : [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({ compressor: { warnings: false } }),
        new webpack.optimize.DedupePlugin(),
      ]
    ),
    module: {
      loaders: [
        {
          loader: 'babel-loader',
          test: /\.js$/,
          exclude: /node_modules/,
          query: {
            cacheDirectory: false,
          },
        },
        {
          loaders: ['style-loader', 'css-loader'],
          test: /\.css$/,
          exclude: /node_modules/,
        },
      ],
    },
  };
};

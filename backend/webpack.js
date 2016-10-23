/* @flow */
/* eslint-disable import/no-extraneous-dependencies */
import webpack from 'webpack';

module.exports = (options: mixed) => {
  return {
    devtool: options.dev ? 'cheap-module-eval-source-map' : 'hidden-source-map',
    entry: { bundle: './frontend/index.js' },
    output: {
      path: '/',
      filename: '[name].js',
      publicPath: '/',
    },
    plugins: [
      new webpack.ProvidePlugin({ Promise: 'bluebird' }),
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

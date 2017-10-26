const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanCssPlugin = require('less-plugin-clean-css');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const package = require('./package.json');

const extractLess = new ExtractTextPlugin({
  filename: '[name].css'
});

const config = {
  entry: {
    index: './src/index.ts',
    polyfills: [
      'core-js/library/es6',
      'reflect-metadata'
    ]
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },

  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.less']
  },

  module: {
    rules: [
      { test: /\.ts$/, loader: 'ts-loader' },
      { test: /\.tsx$/, loader: 'babel-loader!ts-loader' },
      { test: /\.less$/, use: extractLess.extract({
        use: [
          { loader: 'css-loader', options: { modules: false } },
          { loader: 'less-loader', options: { plugins: [ new CleanCssPlugin() ] }},
          { loader: 'string-replace-loader', query: { search: ':host', replace: ':local(.default)' } }
        ],
        fallback: 'style-loader'
      })}
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: package.name.split('-').join(' ')
    }),
    extractLess,
    new webpack.optimize.CommonsChunkPlugin({
      name: ['app', 'polyfills']
    })
  ]
};

const dev = {
  ...config,
  devtool: 'inline-source-maps'
};

const dist = {
  ...config,
  plugins: [
    ...config.plugins,
    new webpack.optimize.UglifyJsPlugin()
  ]
};

module.exports = { dev, dist };

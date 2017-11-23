const path = require('path');
const fs = require('fs');
const _ = require('lodash');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanCssPlugin = require('less-plugin-clean-css');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HappyPack = require('happypack');
const ForkTypeScript = require('fork-ts-checker-webpack-plugin');

const package = require('./package.json');
const fileType = fs.existsSync('./src/client/index.ts') ? 'ts' : 'js';

const extractLess = new ExtractTextPlugin({
  filename: '[name].css'
});

const config = {
  entry: {
    index: `./src/client/index.${fileType}`,
    polyfills: [
      'tslib',
      'core-js/library/es6',
      'reflect-metadata'
    ]
  },
  output: {
    path: path.resolve(__dirname, 'dist/client'),
    filename: '[name].js'
  },

  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.less']
  },

  module: {
    rules: [
      { test: /\.(j|t)s(x?)$/, exclude: /node_modules/, loader: 'happypack/loader?id=ts' },
      { test: /\.less$/, use: extractLess.extract({
        use: [
          { loader: 'css-loader', options: { modules: false } },
          { loader: 'less-loader', options: { plugins: [ new CleanCssPlugin() ] }},
          { loader: 'string-replace-loader', query: { search: ':host', replace: ':local(.className)' } }
        ],
        fallback: 'style-loader'
      })}
    ]
  },

  plugins: [
    extractLess,
    new ForkTypeScript({
      checkSyntacticErrors: true,
      watch: './src/client',
      tsconfig: './tsconfig.client.json'
    }),
    new HappyPack({
      id: 'ts',
      threads: 2,
      loaders: [
        { path: 'babel-loader' },
        { 
          path: 'ts-loader',
          query: { 
            happyPackMode: true,
            configFile: 'tsconfig.client.json'
          } 
        }
      ]
    }),
    new HtmlWebpackPlugin({
      title: _(package.name).split('-').map(_.capitalize).join(' '),
      minify: { collapseWhitespace: true }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: ['index', 'polyfills']
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

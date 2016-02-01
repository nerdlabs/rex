'use strict ';

var path = require('path');

var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var scopedName = require('./scoped-name');

module.exports = {
  entry: './src/client.js',
  output: {
    filename: 'main.js',
    path: path.resolve('./dist')
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.css$/, loader: ExtractTextPlugin.extract(
        'style-loader',
        [
          'css-loader?modules&importLoaders=1&localIdentName='+ scopedName,
          'postcss-loader'
        ].join('!')
      )}
    ]
  },
  postcss: [
    require('./postcss-global'),
    require('postcss-cssnext'),
    require('csswring')
  ],
  resolve: {
    modulesDirectories: ['node_modules']
  },
  plugins: [
    new ExtractTextPlugin('main.css', { allChunks: true }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"'+ process.env.NODE_ENV +'"'
    })
  ]
};

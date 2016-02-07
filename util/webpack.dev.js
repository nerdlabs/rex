'use strict';

var path = require('path');

var scopedName = require('./scoped-name');

module.exports = {
  entry: [
    './src/client.js'
  ],
  output: {
    filename: 'main.js',
    path: path.resolve('./dist'),
    publicPath: '/'
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.css$/, loaders: [
        'style-loader',
        'css-loader?modules&importLoaders=1&localIdentName=' + scopedName,
        'postcss-loader'
      ]}
    ]
  },
  postcss: [
    require('./postcss-global'),
    require('postcss-cssnext')
  ],
  resolve: {
    modulesDirectories: ['node_modules']
  },
  devtool: 'inline-source-map',
  devServer: {
    proxy: {
      '*': 'http://localhost:3000'
    }
  }
};

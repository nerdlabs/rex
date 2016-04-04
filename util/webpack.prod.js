
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: [
    'normalize.css',
    './util/global.css',
    './src/client.js'
  ],
  output: {
    path: './dist',
    filename: 'main-[hash].js'
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel', exclude: /node_modules/ },
      { test: /\.json$/, loader: 'json' },
      { test: /\.css$/, loader: ExtractTextPlugin.extract(
        'style',
        'css?modules&localIdentName=' + require('./scoped-name'),
        'postcss'
      )}
    ]
  },
  postcss: [
    require('postcss-modules-values'),
    require('postcss-cssnext')
  ],
  plugins: [
    new ExtractTextPlugin('main-[hash].css', { allChunks: true }),
    new webpack.EnvironmentPlugin(['NODE_ENV']),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ]
};

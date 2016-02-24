
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: './src/client.js',
  output: {
    path: './dist',
    filename: 'main-[hash].js'
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.css$/, loader: ExtractTextPlugin.extract(
        'style', [
          'css?modules&localIdentName=' + require('./scoped-name'),
          'postcss'
        ].join('!')
      )}
    ]
  },
  postcss: [
    require('./postcss-global'),
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

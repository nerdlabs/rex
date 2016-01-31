var webpack = require('webpack'); // eslint-disable-line

var path = require('path');

module.exports = {
  entry: [
    './src/client.js',
    'webpack-hot-middleware/client'
  ],
  output: {
    filename: 'main.js',
    path: path.resolve('./dist'),
    libraryTarget: 'umd'
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.css$/, loaders: [
        'style-loader',
        'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
        'postcss-loader'
      ]}
    ]
  },
  postcss: [
    require('./util/postcss-global'),
    require('postcss-cssnext')
  ],
  resolve: {
    modulesDirectories: ['node_modules']
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  devtool: 'inline-source-map'
};

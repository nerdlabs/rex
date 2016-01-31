
var path = require('path');

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
        'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
        'postcss-loader'
      ]}
    ]
  },
  postcss: [
    require('../util/postcss-global'),
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

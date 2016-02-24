
module.exports = {
  entry: [
    './src/client.js'
  ],
  output: {
    filename: 'main.js',
    path: './dist',
    publicPath: '/'
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.css$/, loaders: [
        'style',
        'css?modules&localIdentName=' + require('./scoped-name'),
        'postcss'
      ]}
    ]
  },
  postcss: [
    require('./postcss-global'),
    require('postcss-cssnext')
  ],
  devServer: {
    proxy: {
      '*': 'http://localhost:3000'
    }
  }
};

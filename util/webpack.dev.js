
module.exports = {
  entry: [
    'normalize.css',
    './util/global.css',
    './src/client.js'
  ],
  output: {
    filename: 'main.js',
    path: './dist',
    publicPath: '/'
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel', exclude: /node_modules/ },
      { test: /\.json$/, loader: 'json' },
      { test: /\.css$/, loaders: [
        'style',
        'css?modules&localIdentName=' + require('./scoped-name'),
        'postcss'
      ]}
    ]
  },
  postcss: [
    require('postcss-modules-values'),
    require('postcss-cssnext')
  ],
  devServer: {
    proxy: {
      '*': 'http://localhost:3000'
    }
  }
};

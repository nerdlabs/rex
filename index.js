'use strict';

require('babel-register');
require('css-modules-require-hook')({
  generateScopedName: '[name]__[local]___[hash:base64:5]'
});

global.__REX_API__ = process.env.API || 'http://localhost:3000/api';
global.__REX_DAT__ = undefined;

var server = require('./src/server').default;
server.getAssetUrl = require('./util/asset-url');

var port = process.env.PORT || 3000;
server.listen(port, function () {
  console.log(`> rex listening on port ${port}`); // eslint-disable-line
});

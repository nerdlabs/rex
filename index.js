'use strict';

require('babel-register');
require('css-modules-require-hook')({
  generateScopedName: '[name]__[local]___[hash:base64:5]'
});

global.__REX_API__ = process.env.API || 'http://localhost:3000/api';
global.__REX_DAT__ = undefined;

var server = require('./src/server').default;
server.getAssetUrl = require('./util/asset-url');

server.listen(process.env.PORT || 3000);

'use strict';

require('babel-register');

if (process.env.NODE_ENV === 'production') {
  require('css-modules-require-hook')({
    generateScopedName: require('css-modulesify').generateShortName
  });
}
else {
  require('css-modules-require-hook');
}

global.__REX_API__ = process.env.API || 'http://localhost:3000/api';
global.__REX_DAT__ = undefined;

var spawn = require('throng');
var server = require('./src/server').default;
server.getAssetUrl = require('./util/asset-url');

spawn(
  function () {
    server.listen(process.env.PORT || 3000);
    process.on('SIGTERM', function () {
      server.close();
      process.exit();
    });
  },
  { workers: process.env.WEB_CONCURRENCY || 1 }
);

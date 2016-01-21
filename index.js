'use strict';

require('babel-register');
require('css-modules-require-hook');

var port = process.env.PORT || 3000;
var workers = process.env.WEB_CONCURRENCY || 1;
var api = process.env.API || 'http://localhost:'+port+'/api';

global.__REX_API__ = api;
global.__REX_DAT__ = undefined;

var manage = require('throng');
var server = require('./src/server');

manage(
  function () {
    var instance = server.run(port);
    process.on('SIGTERM', function () {
      instance.close();
      process.exit();
    });
  },
  { workers: workers }
);

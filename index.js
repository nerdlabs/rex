'use strict';

require('babel-register');
require('css-modules-require-hook');

var port = process.env.PORT || 3000;

if (process.env.API) {
  global.__REX_API__ = process.env.API;
}
else {
  global.__REX_API__ = `http://localhost:${port}/api`;
}

global.__REX_DAT__ = undefined;

module.exports = require('./src/server').run(port);

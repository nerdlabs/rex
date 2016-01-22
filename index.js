'use strict';

require('babel-polyfill');
require('babel-register');

if (process.env.NODE_ENV === 'production') {
  require('css-modules-require-hook')({
    generateScopedName: require('css-modulesify').generateShortName
  });
}
else {
  require('css-modules-require-hook');
}

require('git-rev').short(function (rev) {
  global.__REX_REV__ = rev;
  global.__REX_API__ = process.env.API || 'http://localhost:3000/api';
  global.__REX_DAT__ = undefined;
  require('throng')(
    function () {
      var server = require('./src/server').listen(process.env.PORT || 3000);
      process.on('SIGTERM', function () {
        server.close();
        process.exit();
      });
    },
    { workers: process.env.WEB_CONCURRENCY || 1 }
  );
});

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

require('git-rev').short(function (rev) {
  var port = process.env.PORT || 3000;
  var workers = process.env.WEB_CONCURRENCY || 1;
  var api = process.env.API || 'http://localhost:'+port+'/api';

  global.__REX_REV__ = rev;
  global.__REX_API__ = api;
  global.__REX_DAT__ = undefined;

  require('throng')(
    function () {
      var server = require('./src/server').listen(port);
      process.on('SIGTERM', function () {
        server.close();
        process.exit();
      });
    },
    { workers: workers }
  );
});

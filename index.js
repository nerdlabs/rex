
require('babel-register');
require('css-modules-require-hook')({
  generateScopedName: require('./util/scoped-name')
});

var port = process.env.PORT || 3000;
/* eslint-disable no-underscore-dangle */
global.__REX_API__ = process.env.API || 'http://localhost:' + port + '/api';
global.__REX_DAT__ = undefined;
/* eslint-enable no-underscore-dangle */

var server = module.exports = require('./src/server').default;
server.getAssetUrl = require('./util/asset-url');

if (process.env.NODE_ENV !== 'production') {
  require('swagger-express-middleware')('spec/api.yaml', server,
    function (_, middlewares) {
      var keys = ['metadata', 'CORS', 'parseRequest', 'validateRequest', 'mock'];
      server.use('/api', keys.reduce(function (result, key) {
        result.push(middlewares[key]());
        return result;
      }, []));
    }
  );
}

server.listen(port);

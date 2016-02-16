
var fs = require('fs');

if (process.env.NODE_ENV === 'production') {
  var lookup = fs.readdirSync('dist').reduce(function (result, fileName) {
    result[fileName.replace(/(-[0-9a-f]+)/, '')] = fileName;
    return result;
  }, {});
  module.exports = function (fileName) {
    return '/' + lookup[fileName];
  };
}
else {
  module.exports = function (fileName) {
    return '/' + fileName + '?' + Date.now().toString(16);
  };
}

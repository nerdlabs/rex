'use strict';

var fs = require('fs');
var path = require('path');
var crypto = require('crypto');

var length = 12;
var basePath = 'dist';

if (process.env.NODE_ENV === 'production') {
  var hashes = fs.readdirSync(basePath).reduce(function (result, fileName) {
    var fullPath = path.join(basePath, fileName);
    var contents = fs.readFileSync(fullPath);
    var hash = crypto.createHash('sha256').update(contents).digest('hex');
    result[fileName] = hash.substr(0, length);
    return result;
  }, {});
  module.exports = function (fileName) {
    return '/'+ fileName +'?'+ hashes[fileName];
  };
}
else {
  module.exports = function (fileName) {
    return '/'+ fileName +'?'+ crypto.randomBytes(length / 2).toString('hex');
  };
}

'use strict';

var fs = require('fs');
var postcss = require('postcss');

var normalizePath = require.resolve('normalize.css');
var normalizeCSS = fs.readFileSync(normalizePath);
var normalizeAST = postcss.parse(normalizeCSS, { from: normalizePath });

module.exports = postcss.plugin('normalize', function () {
  return function (css) {
    css.prepend(normalizeAST);
  };
});


var fs = require('fs');
var postcss = require('postcss');

var normalizePath = require.resolve('normalize.css');
var normalizeCSS = fs.readFileSync(normalizePath);
var normalizeAST = postcss.parse(normalizeCSS, { from: normalizePath });

var globalPath = require.resolve('./global.css');
var globalCSS = fs.readFileSync(globalPath);
var globalAST = postcss.parse(globalCSS, { from: globalPath });

module.exports = postcss.plugin('global', function () {
  return function (css) {
    css.prepend(globalAST);
    css.prepend(normalizeAST);
  };
});

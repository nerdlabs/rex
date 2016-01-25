var rollup = require('rollup');
var babel = require('rollup-plugin-babel');
var npm = require('rollup-plugin-npm');
var commonjs = require('rollup-plugin-commonjs');

rollup.rollup({
  entry: 'src/client.js',
  plugins: [
    babel({
      exclude: 'node_modules/**' // we don't want to babel all the dependencies
    }),
    npm({
      // jsnext: true, // normally we'd want to use this, but at the moment it doesn't work
      // because all our dependencies should be compiled with babel-rollup preset
      // to have es5 code with es6 import/export statements
      main: true,
      browser: true
    }),
    commonjs({
      include: 'node_modules/**'
    })
  ]
}).then(function (bundle) {
  bundle.write({
    dest: 'dist/bundle.js',
    format: 'cjs'
  });
}).catch(function (error) {
  console.error(error);
});

// reading:
// https://github.com/rollup/rollup
// https://github.com/rollup/rollup/wiki
// https://github.com/rollup/rollup-plugin-commonjs
// https://github.com/rollup/rollup-plugin-npm
// https://github.com/rollup/rollup-plugin-babel
// https://github.com/rollup/babel-preset-es2015-rollup
// https://babeljs.io/docs/setup/#rollup
// http://rollupjs.org/guide/
// https://github.com/rollup/rollup/issues/385

// TODO:
// figure out how to use css modules (generating a separate json file with key:value mappings would probably work)
// automatically replace process.env.* variables with scalar values (atm I've done this by search/replace :D)

// Usage:
// node rollup.js
// replace `process.env.NODE_ENV` with `'production'` in dist/bundle.js
// run uglify --compress --mangle -- dist/bundle.js > dist/bundle.min.js
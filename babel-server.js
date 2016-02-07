// proof of concept
// TODO: investigate if it is possible to transfer just a reference to
// the memory address of the output instead of stringifying and copying
// all the build artifacts

var net = require('net');
var babel = require('babel-core');

function formatError(error) {
  return {
    name: error.name,
    message: error.message,
    code: error.codeFrame
  };
}

net.createServer(function (connection) {
  connection.on('data', function (data) {
    var infile = data.toString('utf-8');
    console.time(infile);
    babel.transformFile(infile, function (err, result) {
      connection.end(JSON.stringify({
        error: err != null ? formatError(err) : null,
        code: result ? result.code : null,
        map: result ? result.map : null
      }));
      console.timeEnd(infile);
    });
  });
}).listen(1337);

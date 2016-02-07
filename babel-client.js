// proof of concept
// TODO: maybe use netcat or build a very small C program for this task

var net = require('net');

function printError(error) {
  process.stderr.write(error.name + ' ' + error.message + '\n');
  process.stderr.write(error.code + '\n');
}

var file = process.argv[2] || null;

var client = net.connect(1337, function () { client.write(file); });

client.on('data', function (data) {
  var result = JSON.parse(data.toString('utf-8'));
  client.destroy();
  if (result.error) {
    printError(result.error);
    process.exit(1);
  } else {
    process.stdout.write(result.code + '\n');
    process.exit(0);
  }
});

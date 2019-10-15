var SerialPort = require('serialport');
var emv = require('node-emv');

// list serial ports:
SerialPort.list(function (err, ports) {
  console.log("Available ports:");

  ports.forEach(function (port) {
    console.log(port.comName);
  });
});

const path = "/dev/tty.UC-232AC";

const Readline = require('@serialport/parser-readline');
const port = new SerialPort(path, {baudRate: 256000});

const parser = new Readline();
port.pipe(parser);

parser.on('data', line => console.log(`> ${line}`));
// port.write('ROBOT POWER ON\n')



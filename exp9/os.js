// osInfo.js
const os = require('os');

console.log('OS Platform:', os.platform());
console.log('OS Architecture:', os.arch());
console.log('Total Memory (bytes):', os.totalmem());
console.log('Free Memory (bytes):', os.freemem());

// pathDemo.js
const path = require('path');

const filePath = '/path/to/some/file.txt';

console.log('File Name:', path.basename(filePath));
console.log('Directory Name:', path.dirname(filePath));
console.log('File Extension:', path.extname(filePath));

// eventsDemo.js
const EventEmitter = require('events');
class MyEmitter extends EventEmitter {}
const myEmitter = new MyEmitter();
myEmitter.on('greet', () => {
  console.log('Hello! Event has been triggered.');
});
myEmitter.emit('greet');

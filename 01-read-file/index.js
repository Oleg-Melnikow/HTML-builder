const fs = require('fs');
const path = require('path');
const { stdout } = require('process');

const pathFile = path.join(__dirname, 'text.txt');
const stream = fs.createReadStream(pathFile);
stream.on('data', (text) => stdout.write(text.toString()));

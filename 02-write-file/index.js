const fs = require('fs');
const path = require('path');
const { stdin, stdout } = process;

const pathFile = path.join(__dirname, 'text.txt');
const otput = fs.createWriteStream(pathFile);

stdout.write('Hello, please enter some text\n');

stdin.on('data', (text) => {
  const isExit = text.toString().toLocaleLowerCase().trim() === 'exit';
  if (isExit) {
    process.exit();
  }
  otput.write(text);
});

process.on('exit', () => stdout.write('Nice work, have a good day!'));
process.on('SIGINT', () => process.exit());

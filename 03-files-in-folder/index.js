const fs = require('fs');
const path = require('path');

const pathFolder = path.join(__dirname, 'secret-folder');

fs.readdir(
  pathFolder,
  {
    withFileTypes: true,
  },
  (error, files) => {
    if (error) console.log(error.message);
    files.forEach((file) => {
      if (file.isFile()) {
        const pathFile = path.join(pathFolder, file.name);
        const extension = path.extname(file.name).slice(1);
        const name = file.name.slice(0, file.name.indexOf('.'));

        fs.stat(pathFile, (err, stats) => {
          if (err) console.log(error.message);
          const size = `${stats.size / 1000}KB`;
          console.log(`${name} - ${extension} - ${size}`);
        });
      }
    });
  },
);

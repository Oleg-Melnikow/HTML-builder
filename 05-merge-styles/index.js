const { join, extname } = require('path');
const fs = require('fs');

const pathStyles = join(__dirname, 'styles');
const pathBundle = join(__dirname, 'project-dist', 'bundle.css');

fs.readdir(
  pathStyles,
  {
    withFileTypes: true,
  },
  (error, files) => {
    if (error) throw error.message;

    const output = fs.createWriteStream(pathBundle);
    const cssFiles = files.filter((file) => extname(file.name) === '.css');

    cssFiles.forEach((file) => {
      if (file.isFile()) {
        const pathFile = join(pathStyles, file.name);

        fs.readFile(pathFile, (err, data) => {
          if (err) throw err.message;
          output.write(data);
        });
      }
    });
  },
);

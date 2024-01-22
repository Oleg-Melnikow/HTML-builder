const { join } = require('path');
const { mkdir, readdir, copyFile, rm } = require('fs/promises');

const pathTo = join(__dirname, 'files-copy');
const pathFrom = join(__dirname, 'files');

(async function () {
  try {
    await rm(pathTo, { recursive: true, force: true });
    await mkdir(pathTo, { recursive: true });

    const files = await readdir(pathFrom, { withFileTypes: true });

    files.forEach((file) => {
      const pathCurrent = join(pathFrom, file.name);
      const pathCopy = join(pathTo, file.name);

      copyFile(pathCurrent, pathCopy);
    });
  } catch (error) {
    console.log(error);
  }
})();

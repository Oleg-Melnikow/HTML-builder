const fs = require('fs');
const { join, extname } = require('path');
const { mkdir, readdir, copyFile, readFile } = require('fs/promises');

const pathProject = join(__dirname, 'project-dist');
const pathTo = join(__dirname, 'assets');
const pathFrom = join(__dirname, 'project-dist', 'assets');
const pathComponents = join(__dirname, 'components');

(async function () {
  try {
    await mkdir(pathProject, { recursive: true });
    assetsCopy(pathTo, pathFrom);
    buildStyles();
    buildHtml();
  } catch (error) {
    console.log(error);
  }
})();

async function buildHtml() {
  const pathTo = join(__dirname, 'template.html');
  const pathFrom = join(__dirname, 'project-dist', 'index.html');

  let html = await readFile(pathTo, 'utf-8');

  const components = await readdir(pathComponents, { withFileTypes: true });

  async function chnageHtml(components, html) {
    return await components.reduce(async (acc, cur) => {
      const name = cur.name.slice(0, cur.name.indexOf('.'));
      const data = await readFile(join(pathComponents, cur.name), 'utf-8');
      const promise = await acc;
      return promise.replace(`{{${name}}}`, data);
    }, html);
  }

  const updatehtml = await chnageHtml(components, html);
  const otput = fs.createWriteStream(pathFrom);

  otput.write(updatehtml);
}

async function assetsCopy(to, from) {
  await mkdir(from, { recursive: true });

  const files = await readdir(to, { withFileTypes: true });

  files.forEach(async (file) => {
    const pathDirTo = join(to, file.name);
    const pathDirFrom = join(from, file.name);

    if (file.isDirectory()) {
      assetsCopy(pathDirTo, pathDirFrom);
    }

    if (file.isFile()) {
      copyFile(pathDirTo, pathDirFrom);
    }
  });
}

function buildStyles() {
  const pathStyles = join(__dirname, 'styles');
  const pathBundle = join(__dirname, 'project-dist', 'style.css');

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
}

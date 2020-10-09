const sane = require('sane');
const promisify = require('util').promisify;
const exec = promisify(require('child_process').exec);

const { CONTAINER_NAME } = process.env;

const getContainerId = async () => {
  if (!CONTAINER_NAME) {
    console.log(
      'Please set CONTAINER_NAME environment variable:\n CONTAINER_NAME=your_name_here npm run postbuild:lib:watch'
    );
    return false;
  }
  return await exec(`docker ps --quiet --filter "name=${CONTAINER_NAME}"`)
    .then(({ stdout, stderr }) => {
      if (stderr) {
        console.log(stderr);
        return false;
      }
      const containerIds = stdout.split('\n').filter(el => el.length > 0);
      if (containerIds.length === 1) {
      } else if (containerIds.length < 1) {
        console.log(`No container with a name like ${CONTAINER_NAME} running`);
        return false;
      } else if (containerIds.length > 1) {
        console.log(
          `Multiple containers with names like ${CONTAINER_NAME} running: ${containerIds.reduce(
            (acc, cur) => acc + cur + ',',
            ''
          )}`
        );
        return false;
      }
      return containerIds[0];
    })
    .catch(reason => console.log(reason));
};
const buildWatcher = sane('dist/ngx-prx-styleguide');

buildWatcher.on('change', async (filepath, root, stat) => {
  // The final file updated by the Angular build is the package.json
  if (filepath === 'package.json') {
    console.log(`${filepath} updated, Angular build complete`);
    console.log(`Building assets`);
    const assetBuild = await exec('npm run build:lib:assets')
      .then(({ stdout, stderr }) => {
        if (stderr) {
          console.log(stderr);
          return false;
        }
        console.log(stdout);
        return true;
      })
      .catch(reason => console.log(reason));

    const containerId = await getContainerId();

    if (containerId) {
      console.log(`Found running ${CONTAINER_NAME} container: ${containerId}`);
      exec(
        `npm pack ./dist/ngx-prx-styleguide && docker cp *.tgz ${containerId}:/app/ngx-prx-styleguide.tgz && docker exec ${containerId} sh -c "yarn add file:ngx-prx-styleguide.tgz"`
      ).then(({ stdout, stderr }) => {
        if (stderr) {
          console.log(stderr);
        }
        console.log('installed successfully');
        console.log(stdout);
      });
    } else {
      console.log(`Couldn't identify a container to copy to`);
    }
  }
});

/*
const packWatcher = sane('dist', {glob: ['*.tgz']});

packWatcher.on('change', (filepath, root, stat) => {
  console.log('file updated', filepath);
  exec('docker cp dist/ngx-prx-styleguide/. publishprxorg_publish_1:/app/node_modules/ngx-prx-styleguide')
    .then(({stdout,stderr}) => {
      if(stderr) {
        console.log(stderr);
      }
      console.log('copied successfully');
      console.log(stdout);
    })
});
*/

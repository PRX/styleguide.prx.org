'use strict';

const fs = require('fs');
const path = require('path');
const glob = require('glob');
const camelCase = require('camelcase');
const ngc = require('@angular/compiler-cli/src/main').main;
const rollup = require('rollup');
const nodeResolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const uglify = require('rollup-plugin-uglify');
const sourcemaps = require('rollup-plugin-sourcemaps');
const postcss = require('postcss');
const postcssImport = require('postcss-import');
const postcssUrl = require('postcss-url');
const postcssCustomProperties = require('postcss-custom-properties');

const inlineResources = require('./inline-resources');


const libName = require('./package.json').name;
const rootFolder = path.join(__dirname);
const compilationFolder = path.join(rootFolder, 'out-tsc');
const srcFolder = path.join(rootFolder, 'src/lib');
const distFolder = path.join(rootFolder, 'dist');
const tempLibFolder = path.join(compilationFolder, 'lib');
const es5OutputFolder = path.join(compilationFolder, 'lib-es5');
const es2015OutputFolder = path.join(compilationFolder, 'lib-es2015');

const es2015Chart = name => `${es2015OutputFolder}/src/charts/${name}-chart.component.js`;
const es2015DatePicker = path.join(es2015OutputFolder, 'src/datepicker/datepicker.component.js');

return Promise.resolve()
  // Copy library to temporary folder and inline html/css.
  .then(() => _relativeCopy(`**/*`, srcFolder, tempLibFolder)
    .then(() => inlineResources(tempLibFolder))
    .then(() => console.log('Inlining succeeded.'))
  )
  // Compile to ES2015.
  .then(() => ngc({ project: `${tempLibFolder}/tsconfig.es2015.json` })
    .then(exitCode => exitCode === 0 ? Promise.resolve() : Promise.reject())
    .then(() => console.log('ES2015 compilation succeeded.'))
  )
  // Compile to ES5.
  .then(() => ngc({ project: `${tempLibFolder}/tsconfig.es5.json` })
    .then(exitCode => exitCode === 0 ? Promise.resolve() : Promise.reject())
    .then(() => console.log('ES5 compilation succeeded.'))
  )
  // Copy typings and metadata to `dist/` folder.
  .then(() => Promise.resolve()
    .then(() => _relativeCopy('**/*.d.ts', es2015OutputFolder, distFolder))
    .then(() => _relativeCopy('**/*.metadata.json', es2015OutputFolder, distFolder))
    .then(() => console.log('Typings and metadata copy succeeded.'))
  )
  // Fix ES2015 import 'thing/index' instead of just 'thing' (TODO: whyyyyyyy????)
  .then(() => Promise.resolve()
    .then(() => _replaceText(es2015DatePicker, 'pikaday/index', 'pikaday'))
    .then(() => _replaceText(es2015Chart('indexed'), 'c3/index', 'c3'))
    .then(() => _replaceText(es2015Chart('timeseries'), 'c3/index', 'c3'))
    .then(() => console.log('Hack to fix ES2015 Pikaday succeeded.'))
  )
  // Bundle lib.
  .then(() => {
    // Base configuration.
    const es5Entry = path.join(es5OutputFolder, `${libName}.js`);
    const es2015Entry = path.join(es2015OutputFolder, `${libName}.js`);
    const rollupBaseConfig = {
      moduleName: camelCase(libName),
      sourceMap: true,
      // ATTENTION:
      // Add any dependency or peer dependency your library to `globals` and `external`.
      // This is required for UMD bundle users.
      globals: {
        // The key here is library name, and the value is the the name of the global variable name
        // the window object.
        // See https://github.com/rollup/rollup/wiki/JavaScript-API#globals for more.
        '@angular/common': 'ng.common',
        '@angular/core': 'ng.core',
        '@angular/forms': 'ng.forms',
        '@angular/http': 'ng.http',
        '@angular/platform-browser': 'ng.platformBrowser',
        '@angular/router': 'ng.router',
        'rxjs/Observable': 'Rx',
        'rxjs/Observer': 'Rx',
        'rxjs/Subscription': 'Rx',
        'rxjs/ReplaySubject': 'Rx',
        'rxjs/add/observable/forkJoin': 'Rx.Observable',
        'rxjs/add/observable/from': 'Rx.Observable',
        'rxjs/add/observable/of': 'Rx.Observable',
        'rxjs/add/observable/throw': 'Rx.Observable',
        'rxjs/add/operator/catch': 'Rx.Observable',
        'rxjs/add/operator/concatAll': 'Rx.Observable',
        'rxjs/add/operator/finally': 'Rx.Observable',
        'rxjs/add/operator/first': 'Rx.Observable',
        'rxjs/add/operator/map': 'Rx.Observable',
        'rxjs/add/operator/mergeMap': 'Rx.Observable',
        'rxjs/add/operator/share': 'Rx.Observable',
        'rxjs/add/operator/skip': 'Rx.Observable',
        'rxjs/add/operator/toArray': 'Rx.Observable',
        'c3': 'C3',
        'moment': 'moment',
        'pikaday': 'Pikaday'
      },
      external: [
        // List of dependencies
        // See https://github.com/rollup/rollup/wiki/JavaScript-API#external for more.
        '@angular/common',
        '@angular/core',
        '@angular/forms',
        '@angular/http',
        '@angular/platform-browser',
        '@angular/router',
        'rxjs/Observable',
        'rxjs/Observer',
        'rxjs/Subscription',
        'rxjs/ReplaySubject',
        'rxjs/add/observable/forkJoin',
        'rxjs/add/observable/from',
        'rxjs/add/observable/of',
        'rxjs/add/observable/throw',
        'rxjs/add/operator/catch',
        'rxjs/add/operator/concatAll',
        'rxjs/add/operator/finally',
        'rxjs/add/operator/first',
        'rxjs/add/operator/map',
        'rxjs/add/operator/mergeMap',
        'rxjs/add/operator/share',
        'rxjs/add/operator/skip',
        'rxjs/add/operator/toArray',
        'c3',
        'moment',
        'pikaday'
      ],
      onwarn: (warning) => {
        // Suppress this error message... there are hundreds of them. Angular team says to ignore it.
        // https://github.com/rollup/rollup/wiki/Troubleshooting#this-is-undefined
        if (warning.code === 'THIS_IS_UNDEFINED') return;
        console.error(warning.message);
      },
      plugins: [
        nodeResolve({jsnext: true, main: true}),
        // TODO: had to move c3 to a "dependency", because d3 doesn't get
        // bundled correctly and blows up in the parent project.
        // commonjs({
        //   namedExports: {
        //     'node_modules/c3/c3.js': ['generate']
        //   }
        // }),
        commonjs(),
        sourcemaps()
      ]
    };

    // UMD bundle.
    const umdConfig = Object.assign({}, rollupBaseConfig, {
      entry: es5Entry,
      dest: path.join(distFolder, `bundles`, `${libName}.umd.js`),
      format: 'umd',
    });

    // Minified UMD bundle.
    const minifiedUmdConfig = Object.assign({}, rollupBaseConfig, {
      entry: es5Entry,
      dest: path.join(distFolder, `bundles`, `${libName}.umd.min.js`),
      format: 'umd',
      plugins: rollupBaseConfig.plugins.concat([uglify({})])
    });

    // ESM+ES5 flat module bundle.
    const fesm5config = Object.assign({}, rollupBaseConfig, {
      entry: es5Entry,
      dest: path.join(distFolder, `${libName}.es5.js`),
      format: 'es'
    });

    // ESM+ES2015 flat module bundle.
    const fesm2015config = Object.assign({}, rollupBaseConfig, {
      entry: es2015Entry,
      dest: path.join(distFolder, `${libName}.js`),
      format: 'es'
    });

    const allBundles = [
      umdConfig,
      minifiedUmdConfig,
      fesm5config,
      fesm2015config
    ].map(cfg => rollup.rollup(cfg).then(bundle => bundle.write(cfg)));

    return Promise.all(allBundles)
      .then(() => console.log('All bundles generated successfully.'))
  })
  // Fix unneeded momentjs require (TODO: a better way)
  .then(() => Promise.resolve()
    .then(() => _replaceText(`${distFolder}/${libName}.js`, 'require(\'./locale', '//require(\'./locale'))
    .then(() => _replaceText(`${distFolder}/${libName}.es5.js`, 'require(\'./locale', '//require(\'./locale'))
    .then(() => console.log('Hack to fix moment locale require() succeeded.'))
  )
  // Copy package files
  .then(() => Promise.resolve()
    .then(() => _relativeCopy('LICENSE', rootFolder, distFolder))
    .then(() => _relativeCopy('package.json', rootFolder, distFolder))
    .then(() => _relativeCopy('README.md', rootFolder, distFolder))
    .then(() => console.log('Package files copy succeeded.'))
  )
  // Global Styles
  .then(() => _processStyle(path.join(srcFolder, 'assets', 'styles', 'base.css'), path.join(distFolder, 'styles.css'))
    .then(() => console.log('Style processing succeeded.'))
  )
  .catch(e => {
    console.error('\Build failed. See below for errors.\n');
    console.error(e);
    process.exit(1);
  });


// Copy files maintaining relative paths.
function _relativeCopy(fileGlob, from, to) {
  return new Promise((resolve, reject) => {
    glob(fileGlob, { cwd: from, nodir: true }, (err, files) => {
      if (err) reject(err);
      files.forEach(file => {
        const origin = path.join(from, file);
        const dest = path.join(to, file);
        const data = fs.readFileSync(origin, 'utf-8');
        _recursiveMkDir(path.dirname(dest));
        fs.writeFileSync(dest, data);
        resolve();
      })
    })
  });
}

// Recursively create a dir.
function _recursiveMkDir(dir) {
  if (!fs.existsSync(dir)) {
    _recursiveMkDir(path.dirname(dir));
    fs.mkdirSync(dir);
  }
}

// Replace some text in a file
function _replaceText(file, find, replace, log) {
  return new Promise((resolve, reject) => {
    fs.readFile(file, 'utf8', (err, txt) => {
      if (err) {
        reject(err);
      } else {
        fs.writeFile(file, txt.replace(find, replace), 'utf8', err => {
          if (err) {
            reject(err);
          } else {
            if (log) { console.log(log); }
            resolve();
          }
        });
      }
    });
  });
}

function _processStyle(basefile, outfile, log) {
  return new Promise((resolve, reject) => {
    fs.readFile(basefile, 'utf8', (err, txt) => {
      if (err) {
        reject(err);
      } else {
        const urlOpts = [
          {
            filter: '**/assets/images/**/*',
            url: 'inline'
          }
        ];
        postcss()
          .use(postcssImport())
          .use(postcssUrl(urlOpts))
          .use(postcssCustomProperties())
          .process(txt, {from: basefile, to: outfile}).then(result => {
          fs.writeFile(outfile, result.css, 'utf8', err => {
            if (err) {
              reject(err);
            } else {
              if (log) {
                console.log(log);
              }
              resolve();
            }
          });
        });
      }
    });
  });
}

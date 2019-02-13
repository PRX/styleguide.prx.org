const fs = require('fs')
const { exec } = require('child_process');

const newVer = JSON.parse(
  fs.readFileSync('package.json')
)['version']

process.stdout.write(newVer)

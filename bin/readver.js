const fs = require('fs')

const newVer = JSON.parse(
  fs.readFileSync('package.json')
)['version']

process.stdout.write(newVer)

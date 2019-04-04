// const ngPreset = require('jest-preset-angular/jest-preset')

// modifiedGlobals = {
//   ...ngPreset.globals,
//   'ts-jest': {
//     ...ngPreset.globals['ts-jest'],
//     tsConfig: '<rootDir>/test/tsconfig.jest.json'
//   }
// }

// modifiedConfig = {
//   ...ngPreset,
//   globals: { ...modifiedGlobals },
//   setupFilesAfterEnv: ["<rootDir>/test/setupJest.ts"],
// }
// module.exports = modifiedConfig
module.exports = {
  preset: "jest-preset-angular",
  setupFilesAfterEnv: ["<rootDir>/test/setupJest.ts"],
  globals: {
    'ts-jest': {
      tsConfig: '<rootDir>/test/tsconfig.jest.json',
    },
    "__TRANSFORM_HTML__": true
  },
  coverageDirectory: "./coverage/"
}


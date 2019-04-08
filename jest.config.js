const angularPreset = require('jest-preset-angular/jest-preset')

module.exports = {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: [
    '<rootDir>/test/setupJest.ts',
  ],
  globals: {
    'ts-jest': {
      ...angularPreset.globals["ts-jest"],
      tsConfig: '<rootDir>/test/tsconfig.jest.json'
    },
  },
  moduleNameMapper: {
    c3: '<rootDir>/test/__mocks__/c3.js',
  },
  coverageDirectory: './coverage/',
  testPathIgnorePatterns: [
    '<rootDir>/node_modules',
    '<rootDir>/dist'
  ]
}
module.exports = {
  preset: "jest-preset-angular",
  setupFilesAfterEnv: ["<rootDir>/test/setupJest.ts"],
  globals: {
    'ts-jest': {
      tsConfig: '<rootDir>/test/tsconfig.jest.json',
    },
    "__TRANSFORM_HTML__": true
  },
  moduleNameMapper: {
    c3: "<rootDir>/test/__mocks__/c3.js"
  },
  coverageDirectory: "./coverage/"
}


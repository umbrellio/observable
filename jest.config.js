/* eslint-env node */

module.exports = {
  bail: 1,
  coverageDirectory: "coverage",
  collectCoverageFrom: ["**/src/**"],
  coverageReporters: ["text", "html"],
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
  moduleDirectories: ["node_modules"],
  moduleFileExtensions: ["js"],
  notify: true,
  notifyMode: "always",
  resetMocks: true,
  testEnvironment: "jsdom",
  testMatch: [
    "**/tests/**/*.test.js",
  ],
}

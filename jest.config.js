module.exports = {
  rootDir: "./",
  testEnvironment: "node", // Use node environment for testing
  verbose: true, // Display individual test results with descriptions
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.jsx?$", // Regex pattern to find test files
  collectCoverage: true, // Enable coverage collection
  coverageReporters: ["json", "lcov", "text", "clover"],
  moduleDirectories: ["node_modules", "src", "<rootDir>"],
  moduleNameMapper: {
    "^app/(.*)$": "<rootDir>/src/$1",
    "^@Modules/(.*)$": "<rootDir>/src/modules/$1",
    "^@Common/(.*)$": "<rootDir>/src/common/$1",
    // Add more mappings as needed for your project structure
  },
};

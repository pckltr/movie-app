module.exports = {
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.(js?)$": "babel-jest",
  },
  transformIgnorePatterns: ["<rootDir>/node_modules/"],

  setupFilesAfterEnv: ["<rootDir>/src/setupTests.js"],
};

module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  moduleFileExtensions: ["ts", "tsx", "js", "mjs"],
  moduleDirectories: ["node_modules"],
  moduleNameMapper: {
    "^.+\\.svg$": "<rootDir>/src/jest/fileMock.js",
    "^.+\\.css$": "identity-obj-proxy",
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  transform: {
    "^.+\\.(js|jsx|ts|tsx|mjs)$": [
      "babel-jest",
      {
        targets: {
          node: "20",
        },
        compact: false,
        presets: ["next/babel"],
      },
    ],
  },
  cacheDirectory: ".jest-cache",
};

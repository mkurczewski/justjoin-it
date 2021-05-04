module.exports = {
  preset: "ts-jest",
  globals: {
    "ts-jest": {
      tsconfig: "tsconfig.jest.json",
    },
  },
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  collectCoverageFrom: [
    "**/*.{js,jsx,ts,tsx}",
    "!**/*.d.ts",
    "!**/node_modules/**",
  ],
  moduleNameMapper: {
    ".+\\.(css|styl|less|sass|scss)$": "identity-obj-proxy",
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json"],
  setupFilesAfterEnv: ["<rootDir>/jest-setup.js"],
  testPathIgnorePatterns: ["<rootDir>/.next/", "<rootDir>/node_modules/"],
  transformIgnorePatterns: ["<rootDir>/node_modules/"],
  coverageDirectory: "coverage",
  coverageReporters: ["lcov", "text-summary", "json-summary"],
}

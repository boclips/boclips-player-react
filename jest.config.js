module.exports = {
  clearMocks: true,
  coverageDirectory: 'coverage',
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/test-support/',
  ],
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json',
    },
  },
  moduleFileExtensions: [
    'js',
    'ts',
    'tsx',
  ],
  moduleNameMapper: {
    'boclips-player/dist/main.css': '<rootDir>/__mocks__/styleMock.ts',
    '\\.(css|less|scss)$': '<rootDir>/__mocks__/styleMock.ts',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/__mocks__/fileMock.ts',
  },
  setupFiles: [
    './src/test-support/setup-env.ts',
  ],
  setupFilesAfterEnv: [
    './src/test-support/setup.ts',
  ],
  testEnvironment: 'jsdom',
  testMatch: [
    '**/*.test.(ts|tsx|js)',
  ],
  testPathIgnorePatterns: [
    '/node_modules/',
  ],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  preset: 'ts-jest',
}

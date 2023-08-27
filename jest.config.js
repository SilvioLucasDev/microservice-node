module.exports = {
  clearMocks: true,
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
    '!<rootDir>/src/**/index.ts',
    '!<rootDir>/src/main/**',
    '!<rootDir>/src/domain/event/*.ts',
    '!<rootDir>/src/infra/repositories/postgres/helpers/connection.ts'
  ],
  coverageDirectory: "coverage",
  coverageProvider: 'babel',
  moduleNameMapper: {
    '@/tests/(.+)': '<rootDir>/tests/$1',
    '@/(.+)': '<rootDir>/src/$1'
  },
  testMatch: ['**/*.spec.ts'],
  roots: [
    '<rootDir>/src',
    '<rootDir>/tests'
  ],
  transform: {
    '\\.ts$': 'ts-jest'
  },
  setupFilesAfterEnv: ['<rootDir>/tests/infra/repositories/postres/mocks/connection.ts'],
  setupFiles: ['dotenv/config']
};

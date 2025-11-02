
module.exports = {
  displayName: 'web',
  testEnvironment: 'jsdom',
  // rootDir for this config is the tests/ folder, so use the folder itself
  roots: ['<rootDir>'],
  testMatch: ['**/web/**/*.test.ts?(x)'],
  transform: { '^.+\.(ts|tsx)$': ['ts-jest', { tsconfig: 'apps/web/tsconfig.json' }] },
  setupFilesAfterEnv: ['@testing-library/jest-dom']
};

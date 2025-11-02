
module.exports = {
  displayName: 'api',
  testEnvironment: 'node',
  // rootDir for this config is the tests/ folder, so use the folder itself
  roots: ['<rootDir>'],
  testMatch: ['**/api/**/*.test.ts'],
  transform: { '^.+\.(ts|tsx)$': ['ts-jest', { tsconfig: 'apps/api/tsconfig.json' }] }
};

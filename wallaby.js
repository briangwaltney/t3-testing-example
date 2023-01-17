require('dotenv').config({ path: '.env.test' });

module.exports = () => ({
  autoDetect: true,
  tests: ['src/**/*.test.ts?(x)'],
  reportConsoleErrorAsError: true,
});
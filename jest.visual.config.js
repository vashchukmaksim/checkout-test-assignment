const baseConfig = require('./jest.config')

module.exports = {
	...baseConfig,
	preset: 'jest-puppeteer',
	testMatch: ['**/__tests__/**/*.visual.(js|ts|tsx)', '**/?(*.)+(visual.spec|visual.test).(js|ts|tsx)'],
}

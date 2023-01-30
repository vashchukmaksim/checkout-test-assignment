module.exports = {
	testEnvironment: 'jsdom',
	globals: {
		'ts-jest': {
			tsconfig: 'tsconfig.json',
		},
	},

	rootDir: './',
	testMatch: ['**/?!(*.visual.)+(spec|test).(js|ts|tsx)', '**/__tests__/**/?!(*.visual)+(js|ts|tsx)'],
	moduleFileExtensions: ['ts', 'tsx', 'js'],
	roots: ['<rootDir>/src/app/domains'],
	modulePaths: ['<rootDir>'],
	moduleDirectories: ['node_modules', '<rootDir>', 'src'],
	setupFiles: ['jest-date-mock'],
	setupFilesAfterEnv: ['raf/polyfill', '<rootDir>/jest.setup.js'],
	snapshotSerializers: ['@emotion/jest/serializer'],
	testPathIgnorePatterns: ['<rootDir>/node_modules/'],
	transform: {
		'\\.(ts|tsx)$': 'ts-jest',
		'\\.js$': 'babel-jest',
		'\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2|mp4)$': 'jest-transform-stub',
		'^.+\\.(css|scss|sass|less)$': 'jest-preview/transforms/css',
		'^(?!.*\\.(js|jsx|mjs|cjs|ts|tsx|css|json)$)': 'jest-preview/transforms/file',
		'\\.svg': '<rootDir>/jest-svg-transformer.js',
		'\\.inline.svg': '<rootDir>/jest-svg-transformer.js',
	},

	moduleNameMapper: {
		'^.+.(css|styl|less|sass|scss|png|jpg|ttf|woff|mp4|woff2)$': 'jest-transform-stub',
		'^.+\\svg': '<rootDir>/jest-svg-transformer.js',
		'^.+\\inline.svg': '<rootDir>/jest-svg-transformer.js',
		'^app/utils/(.*)$': 'app/utils/$1',
		'^app/utils': 'src/app/utils/index.ts',
		'^app/hooks/(.*)$': 'src/app/hooks/$1',
		'^app/hooks': 'src/app/hooks/index.ts',
		'^app/domains/(.*)$': 'src/app/domains/$1',
		'^app/domains': 'src/app/domains/index.ts',
		'^app/resources/(.*)$': 'src/app/resources/$1',
		'^app/resources': 'src/app/resources/index.ts',
		'^app/ui-kit/(.*)$': 'src/ui-kit/$1',
		'^app/ui-kit': 'src/ui-kit/index.ts',
		'^app/config': 'src/app/config.ts',
	},

	coverageReporters: ['html', 'text'],
}

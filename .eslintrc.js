// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path')

module.exports = {
	env: {
		browser: true,
		es6: true,
		node: true,
		'jest/globals': true,
	},
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 2020,
		sourceType: 'module',
		project: path.resolve(__dirname, './tsconfig.json'),
		ecmaFeatures: {
			jsx: true,
		},
	},
	settings: {
		react: {
			pragma: 'React',
			version: 'detect',
		},
	},
	plugins: ['jest'],
	extends: ['eslint:recommended', 'plugin:prettier/recommended', 'plugin:jest/recommended'],
	overrides: [
		{
			env: {
				'jest/globals': true,
			},
			files: ['*.ts', '*.tsx', '*.spec.ts', '*.spec.tsx'],
			extends: [
				'eslint:recommended',
				'plugin:@typescript-eslint/eslint-recommended',
				'plugin:@typescript-eslint/recommended',
				'plugin:@typescript-eslint/recommended-requiring-type-checking',
				'plugin:react/recommended',
				'plugin:jsdoc/recommended',
				'plugin:promise/recommended',
				'plugin:jest/recommended',
				'prettier',
				'plugin:i18next/recommended',
			],
			plugins: [
				'@typescript-eslint',
				'eslint-plugin-import',
				'no-null',
				'import',
				'prefer-arrow',
				'react',
				'react-hooks',
				'jsdoc',
				'promise',
				'prettier',
				'jest',
				'@emotion',
				'i18next',
			],
			rules: {
				semi: ['error', 'never'],
				'react/prop-types': 'off',
				'react/jsx-uses-react': 'off',
				'react/react-in-jsx-scope': 'off',
				'@emotion/no-vanilla': 'error',
				'@emotion/import-from-emotion': 'error',
				'@emotion/styled-import': 'error',
				'@emotion/jsx-import': 'off', // otherwise it includes jsx import into a file but we use babel plugin for it
				'i18next/no-literal-string': 'off', // it disables all string literals - doesn't make sense, keep it turned off
				'@typescript-eslint/no-misused-promises': 'off', // otherwise error raise for react-hook-form handleSubmit inside onClick button handler (to be checked later)
				'@typescript-eslint/no-unused-vars': 'off', // use noUnusedLocals and noUnusedParameters in tsconfig.json https://stackoverflow.com/a/63767419/4393209
				'@typescript-eslint/consistent-type-imports': 'error',
				'@typescript-eslint/no-floating-promises': 'off',
			},
		},
	],
	rules: {
		'import/order': [
			'error',
			{
				'newlines-between': 'always',
				warnOnUnassignedImports: true,
				pathGroupsExcludedImportTypes: ['builtin'],
				pathGroups: [
					{
						pattern: 'app/**',
						group: 'external',
						position: 'after',
					},
				],
			},
		],
		'prettier/prettier': [
			'error',
			{
				jsxSingleQuote: false,
				singleQuote: true,
				trailingComma: 'all',
				quoteProps: 'as-needed',
				bracketSpacing: true,
				bracketSameLine: false,
				arrowParens: 'avoid',
			},
		],
	},
}

// Common Babel config
// https://babeljs.io/docs/en/config-files#project-wide-configuration
module.exports = {
	// https://github.com/babel/babel-loader/issues/754#issuecomment-564919059
	ignore: [/[/\\]core-js/, /@babel[/\\]runtime/],
	assumptions: {
		privateFieldsAsProperties: true,
		setPublicClassFields: true,
	},
	// https://github.com/webpack/webpack/issues/4039#issuecomment-762376767
	sourceType: 'unambiguous',
	plugins: [
		// !!! NEVER use that for web build because it generates "require" statements
		// but it can be used for test env
		// '@babel/plugin-transform-modules-commonjs',
		[
			'@babel/plugin-transform-runtime',
			{
				regenerator: true,
			},
		],

		'@babel/plugin-syntax-dynamic-import',
		'@babel/plugin-syntax-import-meta',
		'@babel/plugin-transform-spread',
		'@babel/plugin-transform-classes',

		['@babel/plugin-proposal-decorators', { legacy: true }],
		['@babel/plugin-proposal-pipeline-operator', { proposal: 'minimal' }],
		'@babel/plugin-proposal-class-properties',

		'@babel/plugin-proposal-do-expressions',
		'@babel/plugin-proposal-export-default-from',
		'@babel/plugin-proposal-export-namespace-from',
		'@babel/plugin-proposal-function-bind',
		'@babel/plugin-proposal-function-sent',
		'@babel/plugin-proposal-json-strings',
		'@babel/plugin-proposal-logical-assignment-operators',
		'@babel/plugin-proposal-nullish-coalescing-operator',
		'@babel/plugin-proposal-numeric-separator',
		'@babel/plugin-proposal-optional-chaining',
		'@babel/plugin-proposal-throw-expressions',

		[
			'@emotion',
			{
				sourceMap: false, // with true it fails with out-of-memory sometimes while emotion generate source maps
				autoLabel: 'dev-only',
				labelFormat: '[local]',
				cssPropOptimization: true,
			},
		],
		[
			'inline-react-svg',
			{
				ignorePattern: /^(?!.*\.inline\.svg$).*\.svg$/,
				svgo: {
					floatPrecision: 2,
					// Default list of plugins and how to add another is here https://github.com/svg/svgo
					plugins: [
						{
							name: 'preset-default',
							params: {
								overrides: {
									// customize default plugin options
									// inlineStyles: {
									// 	onlyMatchedOnce: false,
									// },
									// or disable plugins
									// removeDoctype: false,
								},
							},
						},
					],
				},
			},
		],
	],

	presets: [
		// { allowDeclareFields: true } doesn't work in a preset (bug)
		// but we don't need it here because we use ts-loader to transpile typescript
		'@babel/preset-typescript',
		[
			'@babel/preset-env',
			{
				corejs: 3,
				modules: false, // MUST HAVE because we left module resolution to webpack
				useBuiltIns: 'entry',
				targets: '> 0.25%, not dead',
			},
		],
		['@babel/preset-react', { runtime: 'automatic', importSource: '@emotion/react' }],
	],

	env: {
		test: {
			plugins: ['dynamic-import-node', '@babel/plugin-transform-modules-commonjs'],
			presets: [
				'@babel/preset-react',
				[
					'@babel/preset-env',
					{
						targets: {
							browsers: ['> 5%'],
						},
						modules: false,
					},
				],
			],
		},
	},
}

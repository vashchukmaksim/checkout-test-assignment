import path from 'path'
import { fileURLToPath } from 'url'

import webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import TerserPlugin from 'terser-webpack-plugin'
import CopyPlugin from 'copy-webpack-plugin'
import CompressionPlugin from 'compression-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin'
import CleanTerminalPlugin from 'clean-terminal-webpack-plugin'
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin'
import ESLintPlugin from 'eslint-webpack-plugin'
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin'
import CircularDependencyPlugin from 'circular-dependency-plugin'
import LodashModuleReplacementPlugin from 'lodash-webpack-plugin'
import StyleLintPlugin from 'stylelint-webpack-plugin'
import AssetsPlugin from 'assets-webpack-plugin'
import WebpackNodeExternals from 'webpack-node-externals'
import { createEmotionPlugin } from 'emotion-ts-plugin'

// Because we use webpack.babel.mjs (instead of .js)
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Add linked modules for local development if any
const linkedModules = []

const getConfig = function (params = {}) {
	const { mode, target } = params

	const publicPath = `/static/`
	const fileDirs = {
		styles: [
			path.resolve(__dirname, 'src/resources/styles'),
		],
		fonts: [path.resolve(__dirname, 'src/resources/fonts')],
		videos: [path.resolve(__dirname, 'src/resources/videos')],
		images: [
			path.resolve(__dirname, 'src/resources/images'),
			path.resolve(__dirname, 'src/resources/icons'),
		],
	}

	const config = {
		mode,
		target,
		entry: {
			app: `./src/app/index.tsx`,
			resources: `./src/resources/webpack-entry.js`,
		},

		// To debug webpack building process
		infrastructureLogging: {
			level: 'verbose',
		},

		output: {
			publicPath,
			path: path.resolve(__dirname, `bundle/client`),
			filename: mode === 'development' ? '[name].js' : '[name].[contenthash].js',
			chunkFilename: mode === 'development' ? 'chunks/[name].js' : 'chunks/[name].[chunkhash].js',
			clean: {
				// https://github.com/ztoben/assets-webpack-plugin/issues/404
				keep: /assets\.json/,
			},
		},

		module: {
			rules: [
				// https://github.com/remirror/remirror/issues/1473
				{
					test: /\.m?js/,
					resolve: {
						fullySpecified: false,
					},
				},
				{
					enforce: 'pre',
					test: /.(js|.jsx)$/,
					exclude: [/\.(spec|test)\.(js|jsx)$/],
					use: [
						{
							loader: 'source-map-loader',
						},
					],
				},
				{
					test: /\.(js|jsx)$/,
					exclude: [/\.(spec|test)\.(js|jsx)$/],
					use: [
						{
							loader: 'babel-loader',
						},
					],
				},
				{
					enforce: 'pre',
					test: /.(ts|.tsx)$/,
					exclude: [/\.(spec|test)\.(ts|tsx)$/, /node_modules/],
					use: [{ loader: 'source-map-loader' }],
				},
				{
					test: /(.ts|.tsx)$/,
					exclude: [/\.(spec|test)\.(ts|tsx)$/],
					use: [
						{
							loader: 'babel-loader',
						},
						{
							loader: 'ts-loader',
							options: {
								configFile: 'tsconfig.json',
								allowTsInNodeModules: true,
								getCustomTransformers: () => ({
									before: [
										createEmotionPlugin({
											sourcemap: true,
											autoLabel: true,
											labelFormat: '[local]',
											autoInject: true,
											jsxImportSource: '@emotion/react',
										}),
									],
								}),
							},
						},
					],
				},
				{
					test: /\.ttf$|\.eot$|.\woff$|.\woff2$|^(?!.*\.inline\.svg$).*\.svg$/,
					// https://stackoverflow.com/questions/68634225/webpack-5-file-loader-generates-a-copy-of-fonts-with-hash-name
					type: 'javascript/auto',
					include: fileDirs.fonts,
					use: [
						{
							loader: 'file-loader',
							options: {
								name: '[name].[ext]',
								publicPath: `${publicPath}fonts`,
								outputPath: '/fonts',
								useRelativePath: false,
								emitFile: target === 'web',
							},
						},
					],
				},
				{
					test: /\.jpe?g$|\.gif$|\.ico$|\.png$|^(?!.*\.inline\.svg$).*\.svg$/,
					type: 'javascript/auto',
					include: fileDirs.images,
					use: [
						{
							loader: 'file-loader',
							options: {
								name: '[name].[ext]',
								publicPath: `${publicPath}images`,
								outputPath: '/images',
								useRelativePath: false,
								emitFile: target === 'web',
							},
						},
					],
				},
				{
					test: /\.mp4$/,
					type: 'javascript/auto',
					include: fileDirs.videos,
					use: [
						{
							loader: 'file-loader',
							options: {
								name: '[name].[ext]',
								publicPath: `${publicPath}videos`,
								outputPath: '/videos',
								useRelativePath: false,
								emitFile: target === 'web',
							},
						},
					],
				},
				{
					test: /\.inline\.svg$/,
					type: 'javascript/auto',
					include: fileDirs.images,
					use: [
						// last tested version: 3.0.1
						{ loader: 'react-svg-loader' },
					],
				},
				{
					test: /\.(ico|webmanifest|png|svg)$/,
					type: 'javascript/auto',
					include: fileDirs.favicon,
					use: [
						{
							loader: 'file-loader',
							options: {
								name: '[name].[ext]',
								publicPath: `${publicPath}favicon`,
								outputPath: '/favicon',
								useRelativePath: false,
								emitFile: target === 'web',
							},
						},
					],
				},
				{
					test: /browserconfig\.xml$/,
					type: 'javascript/auto',
					use: [
						{
							loader: 'file-loader',
							options: {
								name: '[name].[ext]',
								publicPath,
								outputPath: '',
								useRelativePath: false,
								emitFile: target === 'web',
							},
						},
						{ loader: 'web-app-browserconfig-loader' },
					],
				},
			],
		},

		resolve: {
			extensions: ['.tsx', '.ts', '.js', '.mjs'],
			// ../web-ui/node_modules are needed for linked packages
			modules: [path.resolve(__dirname), path.resolve(__dirname, 'node_modules'), 'node_modules'],
			symlinks: false,
			alias: {
				'app/resources': path.resolve(__dirname, 'src/resources'),
				'app/ui-kit': path.resolve(__dirname, 'src/ui-kit'),
				'app/utils': path.resolve(__dirname, 'src/app/utils'),
				'app/hooks': path.resolve(__dirname, 'src/app/hooks'),
				'app/domains': path.resolve(__dirname, 'src/app/domains'),
				'app/config': path.resolve(__dirname, 'src/app/config'),

				// We need it because otherwise react-query can not resolve
				// it's own import of react and fails with error: export 'default' (imported as 'React') was not found in 'react'
				react: path.resolve(__dirname, './node_modules/react'),
			},
			plugins: [
				new TsconfigPathsPlugin({
					configFile: path.resolve(__dirname, './tsconfig.json'),
				}),
			],
		},

		resolveLoader: {
			modules: ['node_modules'],
		},

		plugins: [
			new HtmlWebpackPlugin({
				template: path.resolve(__dirname, './template.hbs'),
			}),
			new ForkTsCheckerWebpackPlugin({ async: true }),
			new ESLintPlugin({
				extensions: ['js', 'jsx', 'ts', 'tsx'],
			}),
			new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /en/),

			new webpack.EnvironmentPlugin({
				EXPRESS_SSR_PORT: 3000,
				FLUENTD_PORT: 24224,
				// NODE_ENV: null,
				APP_VERSION: null,
				SENTRY_DSN: null,
				TAWK_CHAT_URL: null,
				FLUENTD_DOMAIN: null,
				GOOGLE_ANALYTICS_ID: null,
				WEBSOCKET_URL: null,
			}),

			new CircularDependencyPlugin({
				// exclude detection of files based on a RegExp
				exclude: /a\.js|node_modules/,
				// add errors to webpack instead of warnings
				failOnError: true,
				// allow import cycles that include an async import,
				// e.g. via import(/* webpackMode: "weak" */ './file.js')
				allowAsyncCycles: false,
				// set the current working directory for displaying module paths
				cwd: process.cwd(),
			}),
		],

		devtool: 'inline-source-map',
		ignoreWarnings: [
			{
				message: /Failed to parse source map from/,
			},
		],
	}

	switch (target) {
		case 'web':
			config.module.rules = [
				...config.module.rules,
				{
					test: /^((?!\.module).)*less$/,
					include: fileDirs.styles,
					use: [
						MiniCssExtractPlugin.loader,
						{ loader: 'css-loader' },
						{ loader: 'postcss-loader' },
						{ loader: 'less-loader' },
					],
				},
				{
					test: /\.module.less$/,
					include: [path.resolve(__dirname, 'src/**/*'), ...fileDirs.styles],
					use: [
						MiniCssExtractPlugin.loader,
						{
							loader: 'css-loader',
							options: {
								modules: {
									localIdentName:
										mode === 'production' ? '[hash:base64:5]' : '[name]-[local]--[hash:base64:5]',
								},
							},
						},
						{ loader: 'postcss-loader' },
						{ loader: 'less-loader' },
					],
				},
				{
					test: /\.css$/,
					include: fileDirs.styles,
					use: [MiniCssExtractPlugin.loader, { loader: 'css-loader' }, { loader: 'postcss-loader' }],
				},
				{
					test: /\.hbs$/,
					use: ['handlebars-loader'],
				},
			]

			config.plugins = [
				...config.plugins,
				new webpack.ProvidePlugin({
					process: 'process/browser',
				}),
				new MiniCssExtractPlugin(),
				new AssetsPlugin({
					filename: 'assets.json',
					prettyPrint: true,
					useCompilerPath: true,
					path: path.join(__dirname, 'bundle/client'),
				}),
				new LodashModuleReplacementPlugin({
					paths: true,
					collections: true,
					memoizing: true,
					shorthands: true,
					// Do not remove it, otherwise Recharts throw a random arrow about map is not a function
					flattening: true,
				}),
				new StyleLintPlugin({
					configFile: path.resolve(__dirname, '.stylelintrc'),
					emitErrors: true,
					files: '**/*.(s(c|a)ss|css|less)',
				}),
				new StyleLintPlugin({
					configFile: path.resolve(__dirname, '.stylelintrc-sc.config.js'),
					emitErrors: true,
					files: '**/*.(ts|tsx)',
				}),
				new HtmlWebpackPlugin({
					filename: '../index.html',
					template: 'template.hbs',
					excludeChunks: [],
				}),
				// new CopyPlugin({
				// 	patterns: [{ from: `locales`, to: 'locales' }],
				// }),
			]

			config.devServer = {
				port: 5050,
				compress: true,
				historyApiFallback: true,
				watchFiles: ['src/**/*', ...linkedModules.map(m => `node_modules/${m}/**/*`)],
				liveReload: true,
				devMiddleware: {
					writeToDisk: true,
					publicPath,
				},
				static: {
					directory: path.join(__dirname, `bundle/client`),
					serveIndex: true,
					watch: true,
				},
				// proxy: {
				// 	'/api/**': {
				// 		target: '',
				// 		changeOrigin: true,
				// 		secure: false,
				// 		ws: true,
				// 		rewrite: function (req) {
				// 			req.url = req.url.replace(/^\/api/, '')
				// 		},
				// 	},
				// },
			}

			config.watchOptions = {
				followSymlinks: true,
				ignored: [`node_modules/[^(${linkedModules.join('|')})]+/**`],
			}

			if (mode === 'production') {
				config.plugins = [
					...config.plugins,
					new MiniCssExtractPlugin({
						filename: '[name].[contenthash].css',
						chunkFilename: 'chunks/[name].[chunkhash].css',
						ignoreOrder: true,
					}),
					new CompressionPlugin({
						algorithm: 'gzip',
						test: /\.js$|\.css$|\.html$/,
						threshold: 0,
						minRatio: 0.8,
					}),
					new BundleAnalyzerPlugin({
						analyzerMode: 'static',
						generateStatsFile: true,
						openAnalyzer: false,
					}),
				]

				config.optimization = {
					usedExports: true,
					providedExports: true,
					minimizer: [
						`...`,
						new TerserPlugin({
							terserOptions: {
								drop_console: true,
								dead_code: true,
								output: {
									comments: false,
								},
							},
						}),
						new CssMinimizerPlugin({
							minimizerOptions: {
								preset: [
									'default',
									{
										discardComments: { removeAll: true },
									},
								],
							},
						}),
					],
					splitChunks: {
						cacheGroups: {
							default: false,
							vendors: false,

							// Vendor (without linked modules e.g. @prostpost)
							vendor: {
								chunks: 'all',
								name: 'vendor',
								test(mod /* , chunk */) {
									// if (mod.context.includes('.css')) {
									// 	return false;
									// }
									if (!mod.context) {
										return true
									}
									if (!mod.context.includes('node_modules')) {
										return false
									}
									return !linkedModules.some(str => mod.context.includes(str))
								},
							},
						},
					},
				}
			} else if (mode === 'development') {
				config.plugins = [
					...config.plugins,
					new CleanTerminalPlugin({
						skipFirstRun: true,
					}),
				]

				// Allow HRM for linked modules built with rollup
				config.resolve = {
					...config.resolve,
					mainFields: ['browser', 'module', 'source', 'main'],
				}
			}

			break

		case 'node':
			config.entry = { server: `./src/server.tsx` }
			config.node = {
				__dirname: false,
				__filename: false,
			}

			config.output = {
				filename: '[name].js',
				path: path.resolve(__dirname, `bundle/server`),
				library: 'app',
				libraryTarget: 'commonjs2',
				publicPath,
			}

			config.module.rules = [
				...config.module.rules,
				{
					test: /\.css$/,
					use: [
						{ loader: 'isomorphic-style-loader' },
						{ loader: 'css-loader' },
						{ loader: 'postcss-loader' },
					],
				},
				{
					test: /^((?!\.module).)*less$/,
					include: [path.resolve('')],
					use: [
						{ loader: 'isomorphic-style-loader' },
						{ loader: 'css-loader' },
						{ loader: 'postcss-loader' },
						{ loader: 'less-loader' },
					],
				},
				{
					test: /\.module.less$/,
					include: [path.resolve('')],
					use: [
						{ loader: 'isomorphic-style-loader' },
						{
							loader: 'css-loader',
							options: {
								modules: {
									localIdentName:
										mode === 'production' ? '[hash:base64:5]' : '[name]-[local]--[hash:base64:5]',
								},
							},
						},
						{ loader: 'postcss-loader' },
						{ loader: 'less-loader' },
					],
				},
			]

			config.externalsPresets = { node: true } // mandatory for webpack@5 otherwise we receive errors about images
			config.externals = [
				// Do not place in a bundle modules that are
				// presented in the node_modules.
				// It reduces bundle.js size (840kb -> 8kb in that case)
				// but we don't care. What we do care is that webpack bundle
				// works faster
				WebpackNodeExternals({
					allowlist: [
						// TODO: [CHECK] Not sure if this shortcut works but one by one (as commented below works ok)
						// `/[^(${linkedModules.join('|')})]+/**/`,
						/\.(?!(?:jsx?|json)$).{1,5}$/i,
					],
				}),
			]

			break

		default:
			throw Error('Please set target to "web" or "node" to generate webpack configuration')
	}

	return config
}

export const genConfig = params => (env, argv) => {
	return getConfig({
		...params,
		...argv,
		target: params?.target || argv.target[0],
		app: process.env.APP_NAME,
	})
}

export default genConfig()

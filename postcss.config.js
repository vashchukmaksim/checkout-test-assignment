module.exports = {
	plugins: [
		require('autoprefixer')(),
		require('postcss-discard-duplicates')(),
		require('postcss-preset-env')({
			browsers: 'last 2 versions',
		}),
	],
}

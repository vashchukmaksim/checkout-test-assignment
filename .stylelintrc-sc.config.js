const path = require('path')

module.exports = {
	extends: [
		path.resolve(__dirname, '.stylelintrc'),
		'stylelint-config-standard',
		'stylelint-prettier/recommended',
		// Yes, even with @emotion we use config from SC
		'stylelint-config-styled-components',
	],
	// and processor as well
	processors: ['stylelint-processor-styled-components'],
	// Allow CSS in JS only in *.ts files
	ignoreFiles: ['**/*.css', '**/*.less', '**/*.js', '**/*.jsx', '**/*.tsx'],
	customSyntax: '@stylelint/postcss-css-in-js',
	rules: {
		'declaration-empty-line-before': null, // we want be able to have empty lines between logical blocks
		'no-invalid-double-slash-comments': null, // no need for CSS in JS
	},
}

module.exports = {
	defaultNamespace: 'common',
	sort: true,
	locales: ['en'],
	output: 'locales/$LOCALE/$NAMESPACE.json',
	input: ['src/app/**/*.{ts,tsx}'],
}

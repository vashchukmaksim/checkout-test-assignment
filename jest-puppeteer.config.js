module.exports = {
	server: {
		command: 'yarn run:ssr',
		port: 3000,
		protocol: 'http',
		launchTimeout: 30000, // in ms
		debug: true,
	},
	launch: {
		dumpio: true,
		headless: process.env.HEADLESS !== 'false',
		args: ['--disable-infobars', '--no-sandbox', '--disable-setuid-sandbox'],
		timeout: 120000,
	},
}

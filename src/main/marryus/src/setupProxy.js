const {createProxyMiddleware} = require('http-proxy-middleware')

module.exports = (app) => {
	app.use(
		'/api/*',
		createProxyMiddleware({target:'http://192.168.16.23:8080'}));

	app.use(
		'/geo/*',
		createProxyMiddleware({
			target: 'https://api.vworld.kr', // API 서버 주소
			}));
}
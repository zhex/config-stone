import * as webpack from 'webpack';
import * as middleware from 'webpack-dev-middleware';
import * as hotMiddlware from 'webpack-hot-middleware';
import * as config from '../../webpack.config';

export const injectWebpack = app => {
	const compiler = webpack(config);

	app.use(middleware(compiler, { stats: 'errors-only' }));
	app.use(hotMiddlware(compiler));
	app.use((req, res, next) => {
		if (
			(req.method === 'GET' || req.method === 'HEAD') &&
			req.accepts('html') &&
			!req.url.match(/^\/api/)
		) {
			const fs = compiler.outputFileSystem;
			const content = fs.readFileSync(config.output.path + '/index.html');
			res.set('Content-Type', 'text/html');
			return res.send(content);
		} else {
			next();
		}
	});
};

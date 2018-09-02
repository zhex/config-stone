import {
	ArgumentsHost,
	Catch,
	ExceptionFilter,
	HttpException,
	INestApplication,
	NotFoundException,
} from '@nestjs/common';

export const injectWebpack = (app: INestApplication) => {
	const webpack = require('webpack');
	const middleware = require('webpack-dev-middleware');
	const hotMiddlware = require('webpack-hot-middleware');
	const config = require('../../webpack.config');
	const compiler = webpack(config);

	@Catch(NotFoundException)
	class FallbackException implements ExceptionFilter {
		public catch(ex: HttpException, host: ArgumentsHost) {
			const ctx = host.switchToHttp();
			const res = ctx.getResponse();
			const req = ctx.getRequest();
			const status = ex.getStatus();
			if (
				(req.method === 'GET' || req.method === 'HEAD') &&
				req.accepts('html')
			) {
				const fs = compiler.outputFileSystem;
				const content = fs.readFileSync(
					config.output.path + '/index.html',
				);
				res.set('Content-Type', 'text/html');
				res.send(content);
			} else {
				res.status(status).json({
					status,
					message: 'not found',
				});
			}
		}
	}

	app.use(middleware(compiler, { stats: 'errors-only', watchOptions: { poll: true } }));
	app.use(hotMiddlware(compiler));

	app.useGlobalFilters(new FallbackException());
};

import {
	ArgumentsHost,
	Catch,
	ExceptionFilter,
	HttpException,
	INestApplication,
	NotFoundException,
} from '@nestjs/common';
import * as webpack from 'webpack';
import * as middleware from 'webpack-dev-middleware';
import * as hotMiddlware from 'webpack-hot-middleware';
import * as config from '../../webpack.config';

export const injectWebpack = (app: INestApplication) => {
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

	app.use(middleware(compiler, { stats: 'errors-only' }));
	app.use(hotMiddlware(compiler));

	app.useGlobalFilters(new FallbackException());
};

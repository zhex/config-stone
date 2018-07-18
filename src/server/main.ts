import { NestFactory } from '@nestjs/core';
import * as fallback from 'express-history-api-fallback';
import * as morgan from 'morgan';
import { join } from 'path';
import { ApplicationModule } from './application.module';
import { LogStream } from './common/logger';
import { webpackHotMiddlware, webpackMiddleware } from './middlewares/webpack';

(async () => {
	const app = await NestFactory.create(ApplicationModule);
	app.use(morgan('dev', { stream: new LogStream() }));
	if (process.env.NODE_ENV === 'development') {
		app.use(webpackMiddleware());
		app.use(webpackHotMiddlware());
	}
	const root = join(__dirname, '../ui');
	app.useStaticAssets(root);
	app.use(fallback('index.html', { root }));
	app.listen(3000);
})();

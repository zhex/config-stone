import { NestFactory } from '@nestjs/core';
import * as morgan from 'morgan';
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
	app.listen(3000);
})();

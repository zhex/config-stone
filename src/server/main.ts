import { NestFactory } from '@nestjs/core';
import * as morgan from 'morgan';
import { join } from 'path';
import { ApplicationModule } from './application.module';
import { FallbackException } from './common/fallback-exception';
import { LogStream } from './common/logger';
import { sessionMiddlware } from './middlewares/session';
import { injectWebpack } from './middlewares/webpack';

(async () => {
	const app = await NestFactory.create(ApplicationModule);
	app.use(morgan('dev', { stream: new LogStream() }));
	app.use(sessionMiddlware());

	if (process.env.NODE_ENV === 'development') {
		injectWebpack(app);
	} else {
		const root = join(__dirname, '../ui');
		app.useStaticAssets(root);
		app.useGlobalFilters(new FallbackException());
	}

	app.listen(3000);
})();

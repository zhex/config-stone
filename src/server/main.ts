import { NestFactory } from '@nestjs/core';
import * as morgan from 'morgan';
import { ApplicationModule } from './application.module';
import { LogStream } from './common/logger';

(async () => {
	const app = await NestFactory.create(ApplicationModule);
	app.use(morgan('dev', { stream: new LogStream() }));
	app.listen(3000);
})();

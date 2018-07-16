import { NestFactory } from '@nestjs/core';
import { ApplicationModule } from "./application.module";

(async () => {
	const app = await NestFactory.create(ApplicationModule);
	app.listen(3000);
})();

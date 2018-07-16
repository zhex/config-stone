import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigController } from './controllers/config.controller';
import { AppController } from './controllers/web/app.controller';
import { App } from './entities/app.entity';
import { Item } from './entities/item.entity';
import { Profile } from './entities/profile.entity';
import { AppService } from './services/app.service';

@Module({
	imports: [
		TypeOrmModule.forRoot(),
		TypeOrmModule.forFeature([App, Profile, Item]),
	],
	controllers: [AppController, ConfigController],
	providers: [AppService],
})
export class ApplicationModule {}

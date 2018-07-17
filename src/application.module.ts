import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigController } from './controllers/config.controller';
import { AppController } from './controllers/web/app.controller';
import { ItemController } from './controllers/web/item.controller';
import { ProfileController } from './controllers/web/profile.controller';
import { App } from './entities/app.entity';
import { Item } from './entities/item.entity';
import { Profile } from './entities/profile.entity';
import { AppService } from './services/app.service';
import { EtcdService } from './services/etcd.service';
import { ItemService } from './services/item.service';
import { ProfileService } from './services/profile.service';

@Module({
	imports: [
		TypeOrmModule.forRoot(),
		TypeOrmModule.forFeature([App, Profile, Item]),
	],
	controllers: [
		AppController,
		ProfileController,
		ItemController,
		ConfigController,
	],
	providers: [AppService, ProfileService, ItemService, EtcdService],
})
export class ApplicationModule {}

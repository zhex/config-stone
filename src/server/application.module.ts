import { Module, OnModuleInit } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { logger } from './common/logger';
import { ConfigController } from './controllers/config.controller';
import { AppController } from './controllers/web/app.controller';
import { ItemController } from './controllers/web/item.controller';
import { ProfileController } from './controllers/web/profile.controller';
import { App } from './entities/app.entity';
import { Item } from './entities/item.entity';
import { Profile } from './entities/profile.entity';
import { ReleaseHistory } from './entities/release-history.entity';
import { Release } from './entities/release.entity';
import { AppService } from './services/app.service';
import { EtcdService } from './services/etcd.service';
import { ItemService } from './services/item.service';
import { NotifyService } from './services/notify.service';
import { ProfileService } from './services/profile.service';
import { ReleaseService } from './services/release.service';

@Module({
	imports: [
		TypeOrmModule.forRoot(),
		TypeOrmModule.forFeature([App, Profile, Item, Release, ReleaseHistory]),
	],
	controllers: [
		AppController,
		ProfileController,
		ItemController,
		ConfigController,
	],
	providers: [
		AppService,
		ProfileService,
		ItemService,
		EtcdService,
		NotifyService,
		ReleaseService,
	],
})
export class ApplicationModule implements OnModuleInit {
	private etcdService: EtcdService;

	constructor(private readonly moduleRef: ModuleRef) {
		this.etcdService = this.moduleRef.get(EtcdService);
	}

	public onModuleInit() {
		logger.info('watching config change');
		this.etcdService.watchConfig();
	}
}

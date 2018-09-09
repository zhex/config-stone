import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getManager, In, Repository } from 'typeorm';
import { AppDTO } from '../dto/app.dto';
import { AppUser } from '../entities/app-user.entity';
import { App } from '../entities/app.entity';
import { Item } from '../entities/item.entity';
import { Profile } from '../entities/profile.entity';
import { User } from '../entities/user.entity';
import { EtcdService } from './etcd.service';

@Injectable()
export class AppService {
	constructor(
		@InjectRepository(App) private readonly appRepo: Repository<App>,
		@InjectRepository(AppUser)
		private readonly appUserRepo: Repository<AppUser>,
		private readonly etcdService: EtcdService,
	) {}

	public all() {
		return this.appRepo.find();
	}

	public get(key: string) {
		return this.appRepo.findOne({ where: { key } });
	}

	public async create(data: AppDTO, user: User): Promise<App> {
		let app;
		await getManager().transaction(async t => {
			app = await t.save(App, data);
			await t.insert(Profile, {
				name: 'Default',
				key: 'default',
				appKey: app.key,
			});
			await t.insert(AppUser, {
				appKey: app.key,
				userId: user.id,
				isOwner: 1,
			});
		});
		return app;
	}

	public async update(app: App, data: Partial<AppDTO>) {
		app = this.appRepo.merge(app, data);
		return this.appRepo.save(app);
	}

	public async del(key: string) {
		await this.appRepo.manager.transaction(async t => {
			await t.delete(App,{ key });
			await t.delete(Profile,{ appKey: key });
			await t.delete(Item, { appKey: key });
		});
		this.etcdService.deleteConfigsByAppKey(key);
	}

	public async getOwnerId(key: string): Promise<number> {
		const appUser = await this.appUserRepo.findOne({
			where: {
				appKey: key,
				isOwner: 1,
			},
		});
		return appUser.userId;
	}

	public async getByUserId(userId: string): Promise<App[]> {
		const results = await this.appUserRepo.find({ where: { userId } });
		return this.appRepo.find({
			key: In(results.map(r => r.appKey)),
		});
	}
}

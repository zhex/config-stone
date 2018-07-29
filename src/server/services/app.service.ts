import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getManager, Repository } from 'typeorm';
import { AppDTO } from '../dto/app.dto';
import { App } from '../entities/app.entity';
import { Profile } from '../entities/profile.entity';

@Injectable()
export class AppService {
	constructor(
		@InjectRepository(App) private readonly appRepo: Repository<App>,
	) {}

	public all() {
		return this.appRepo.find();
	}

	public get(key: string) {
		return this.appRepo.findOne({ where: { key } });
	}

	public async create(data: AppDTO): Promise<App> {
		let app;
		await getManager().transaction(async t => {
			app = await t.save(App, data);
			await t.insert(Profile, {
				name: 'Default',
				key: 'default',
				appKey: app.key,
			});
		});
		return app;
	}

	public async update(app: App, data: Partial<AppDTO>) {
		app = this.appRepo.merge(app, data);
		return this.appRepo.save(app);
	}

	public async del(key: string) {
		return this.appRepo.delete({ key });
	}
}

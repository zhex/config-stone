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

	public get(id: number) {
		return this.appRepo.findOne(id);
	}

	public async create(data: AppDTO): Promise<App> {
		let app;
		await getManager().transaction(async t => {
			app = await t.save(App, data);
			await t.insert(Profile, {
				name: 'Default',
				key: 'default',
				appId: app.id,
			});
		});
		return app;
	}

	public async update(app: App, data: Partial<AppDTO>) {
		app = this.appRepo.merge(app, data);
		return this.appRepo.save(app);
	}

	public async del(id: number) {
		return this.appRepo.delete(id);
	}
}

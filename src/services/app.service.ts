import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { App } from '../entities/app.entity';
import { Profile } from '../entities/profile.entity';

@Injectable()
export class AppService {
	constructor(
		@InjectRepository(App) private readonly appRepo: Repository<App>,
		@InjectRepository(Profile)
		private readonly profileRepo: Repository<Profile>,
	) {}

	public getApps() {
		return this.appRepo.find();
	}

	public get(id: number) {
		return this.appRepo.findOne(id, { relations: ['profiles'] });
	}

	public async create(data: Partial<App>) {
		const app = await this.appRepo.save(data);
		await this.profileRepo.insert({
			name: 'Default',
			key: 'default',
			appKey: app.key,
		});
		return app;
	}

	public async update(id: number, data: Partial<App>) {
		let app = await this.get(id);
		app = this.appRepo.merge(app, data);
		return this.appRepo.save(app);
	}

	public async del(id: number) {
		return this.appRepo.delete(id);
	}
}

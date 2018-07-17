import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Profile } from '../entities/profile.entity';
import { EtcdService } from './etcd.service';
import { ItemService } from './item.service';

@Injectable()
export class ProfileService {
	constructor(
		@InjectRepository(Profile)
		private readonly profileRepo: Repository<Profile>,
		private readonly itemService: ItemService,
		private readonly etcdService: EtcdService,
	) {}

	public all(appId: number) {
		return this.profileRepo.find({ where: { appId } });
	}

	public get(id: number) {
		return this.profileRepo.findOne(id, { relations: ['items'] });
	}

	public async create(data: Partial<Profile>) {
		return this.profileRepo.save(data);
	}

	public async update(id: number, data: Partial<Profile>) {
		let profile = await this.get(id);
		profile = this.profileRepo.merge(profile, data);
		return this.profileRepo.save(profile);
	}

	public async del(id: number) {
		return this.profileRepo.delete(id);
	}

	public async release(id: number) {
		const profile = await this.profileRepo.findOne(id, {
			relations: ['app'],
		})
		const items = await this.itemService.all(id);
		const val = items.reduce((colleciton, item) => {
			colleciton[item.key] = item.value;
			return colleciton;
		}, {});
		await this.etcdService.setConfig(profile.app.key, profile.key, val);
	}
}

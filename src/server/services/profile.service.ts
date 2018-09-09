import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProfileDTO } from '../dto/profile.dto';
import { Item } from '../entities/item.entity';
import { Profile } from '../entities/profile.entity';
import { Release } from '../entities/release.entity';
import { EtcdService } from './etcd.service';

@Injectable()
export class ProfileService {
	constructor(
		@InjectRepository(Profile)
		private readonly profileRepo: Repository<Profile>,
		@InjectRepository(Release)
		private readonly etcdService: EtcdService,
	) {}

	public all(appKey: string) {
		return this.profileRepo.find({ where: { appKey } });
	}

	public get(appKey: string, key: string) {
		return this.profileRepo.findOne({ where: { appKey, key } });
	}

	public async create(data: Profile) {
		return this.profileRepo.save(data);
	}

	public async update(profile: Profile, data: Partial<ProfileDTO>) {
		profile = this.profileRepo.merge(profile, data);
		return this.profileRepo.save(profile);
	}

	public async del(appKey: string, key: string) {
		await this.profileRepo.manager.transaction(async t => {
			await t.delete(Profile,{ appKey, key });
			await t.delete(Item, { appKey, profileKey: key });
		});

		await this.etcdService.deleteConfig(appKey, key);
		return true;
	}
}

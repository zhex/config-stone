import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { App } from '../entities/app.entity';
import { Profile } from '../entities/profile.entity';

@Injectable()
export class ProfileService {
	constructor(
		@InjectRepository(Profile)
		private readonly profileRepo: Repository<Profile>,
	) {}

	public all(appKey: string) {
		return this.profileRepo.findOne({ where: { appKey }});
	}

	public get(id: number) {
		return this.profileRepo.findOne(id);
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
}

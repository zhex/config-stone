import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ReleaseHistory, ReleaseHistoryTypes } from '../entities/release-history.entity';
import { Release, ReleaseTypes } from '../entities/release.entity';
import { EtcdService } from './etcd.service';
import { ItemService } from './item.service';

@Injectable()
export class ReleaseService {
	constructor(
		@InjectRepository(Release)
		private readonly releaseRepo: Repository<Release>,
		@InjectRepository(ReleaseHistory)
		private readonly releaseHistoryRepo: Repository<ReleaseHistory>,
		private readonly itemService: ItemService,
		private readonly etcdService: EtcdService,
	) {}

	public getReleases(appKey: string, profileKey: string) {
		return this.releaseRepo.find({
			where: { appKey, profileKey, status: ReleaseTypes.Normal },
			order: { createdAt: -1 },
		});
	}

	public async getHistory(appKey: string, profileKey: string) {
		return this.releaseHistoryRepo.find({
			where: { appKey, profileKey },
			order: { createdAt: -1 },
		});
	}

	public async lastRelease(appKey: string, profileKey: string) {
		return this.releaseRepo.findOne({
			where: { appKey, profileKey, status: ReleaseTypes.Normal },
			order: { createdAt: -1 },
		});
	}

	public async release(
		appKey: string,
		profileKey: string,
		name: string,
	): Promise<Release> {
		const items = await this.itemService.all(appKey, profileKey);
		const val = items.reduce((colleciton, item) => {
			colleciton[item.key] = item.value;
			return colleciton;
		}, {});

		const lastRelease = await this.lastRelease(appKey, profileKey);

		let release = this.releaseRepo.create({
			name,
			appKey,
			profileKey,
			data: JSON.stringify(val),
		});

		await this.releaseRepo.manager.transaction(async t => {
			release = await t.save(release);
			await t.insert(ReleaseHistory, {
				appKey,
				profileKey,
				releaseId: release.id,
				prevReleaseId: lastRelease ? lastRelease.id : 0,
			});
		});
		await this.etcdService.setConfig(appKey, profileKey, val);
		return release;
	}

	public async revert(appKey: string, profileKey: string) {
		const last2 = await this.releaseRepo.find({
			where: { appKey, profileKey, status: ReleaseTypes.Normal },
			order: { createdAt: -1 },
			take: 2,
		});

		if (last2.length < 2) {
			throw new Error('No active release to revert');
		}

		await this.releaseRepo.manager.transaction(async t => {
			last2[0].status = ReleaseTypes.Discard;
			await t.save(last2[0]);
			await t.insert(ReleaseHistory, {
				appKey,
				profileKey,
				releaseId: last2[1].id,
				prevReleaseId: last2[0].id,
				type: ReleaseHistoryTypes.Revert,
			});
		});
		await this.etcdService.setConfig(appKey, profileKey, last2[1].data);
		return last2[0];
	}
}

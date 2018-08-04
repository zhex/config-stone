import {
	BadRequestException,
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	Param,
	Post,
	Put,
	ValidationPipe,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import * as status from 'http-status';
import { ProfileDTO } from '../../dto/profile.dto';
import { ReleaseDTO } from '../../dto/release.dto';
import { Profile } from '../../entities/profile.entity';
import { AppService } from '../../services/app.service';
import { ProfileService } from '../../services/profile.service';
import { ReleaseService } from '../../services/release.service';

@Controller('web/api/apps/:appKey/profiles')
export class ProfileController {
	constructor(
		private readonly appService: AppService,
		private readonly profileService: ProfileService,
		private readonly releaseService: ReleaseService,
	) {}

	@Get()
	public async all(@Param('appKey') appId: string) {
		return this.profileService.all(appId);
	}

	@Get(':key')
	public async get(
		@Param('appKey') appKey: string,
		@Param('key') key: string,
	) {
		return this.profileService.get(appKey, key);
	}

	@Post()
	@HttpCode(status.CREATED)
	public async create(
		@Param('appKey') appKey: string,
		@Body(new ValidationPipe())
		data: ProfileDTO,
	) {
		const app = await this.appService.get(appKey);
		if (!app) {
			throw new BadRequestException('invalid app id');
		}
		const profile = plainToClass(Profile, data);
		profile.appKey = appKey;
		await this.profileService.create(profile);

		return null;
	}

	@Put(':key')
	@HttpCode(status.NO_CONTENT)
	public async update(
		@Param('appKey') appKey: string,
		@Param('key') key: string,
		@Body(new ValidationPipe())
		data: Partial<ProfileDTO>,
	) {
		const profile = await this.get(appKey, key);
		if (!profile) {
			throw new BadRequestException('invalid profile key');
		}
		await this.profileService.update(profile, data);
		return null;
	}

	@Delete(':key')
	@HttpCode(status.NO_CONTENT)
	public async delete(
		@Param('appKey') appKey: string,
		@Param('key') key: string,
	) {
		await this.profileService.del(appKey, key);
		return null;
	}

	@Get(':key/releases')
	public async getReleases(
		@Param('appKey') appKey: string,
		@Param('key') key: string,
	) {
		const profile = await this.profileService.get(appKey, key);
		if (!profile) {
			throw new BadRequestException('invalid profile key');
		}
		return this.releaseService.getReleases(appKey, key);
	}

	@Get(':key/release-histories')
	public async getReleaseHistories(
		@Param('appKey') appKey: string,
		@Param('key') key: string,
	) {
		const profile = await this.profileService.get(appKey, key);
		if (!profile) {
			throw new BadRequestException('invalid profile key');
		}
		return this.releaseService.getHistory(appKey, key);
	}

	@Post(':key/release')
	@HttpCode(status.NO_CONTENT)
	public async release(
		@Param('appKey') appKey: string,
		@Param('key') key: string,
		@Body(new ValidationPipe())
		data: ReleaseDTO,
	) {
		const profile = await this.profileService.get(appKey, key);
		if (!profile) {
			throw new BadRequestException('invalid profile key');
		}
		await this.releaseService.release(appKey, key, data.name);
		return null;
	}

	@Post(':key/revert')
	@HttpCode(status.NO_CONTENT)
	public async revert(
		@Param('appKey') appKey: string,
		@Param('key') key: string,
	) {
		const profile = await this.profileService.get(appKey, key);
		if (!profile) {
			throw new BadRequestException('invalid profile key');
		}
		await this.releaseService.revert(appKey, key);
		return null;
	}
}

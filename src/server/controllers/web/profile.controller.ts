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
import { Profile } from '../../entities/profile.entity';
import { AppService } from '../../services/app.service';
import { ProfileService } from '../../services/profile.service';

@Controller('web/api/apps/:appId/profiles')
export class ProfileController {
	constructor(
		private readonly appService: AppService,
		private readonly profileService: ProfileService,
	) {}

	@Get()
	public async all(@Param('appId') appId: number) {
		return this.profileService.all(appId);
	}

	@Get(':id')
	public async get(@Param('id') id: number) {
		return this.profileService.get(id);
	}

	@Post()
	@HttpCode(status.CREATED)
	public async create(
		@Param('appId') appId: number,
		@Body(new ValidationPipe())
		data: ProfileDTO,
	) {
		const app = await this.appService.get(appId);
		if (!app) {
			throw new BadRequestException('invalid app id');
		}
		const profile = plainToClass(Profile, data);
		profile.appId = appId;
		await this.profileService.create(profile);

		return null;
	}

	@Put(':id')
	@HttpCode(status.NO_CONTENT)
	public async update(
		@Param('id') id: number,
		@Body(new ValidationPipe()) data: Partial<ProfileDTO>,
	) {
		const profile = await this.get(id);
		if (!profile) {
			throw new BadRequestException('invalid profile id');
		}
		await this.profileService.update(profile, data);
		return null;
	}

	@Delete(':id')
	@HttpCode(status.NO_CONTENT)
	public async delete(@Param('id') id: number) {
		await this.profileService.del(id);
		return null;
	}

	@Post(':id/release')
	@HttpCode(status.NO_CONTENT)
	public async release(@Param('id') id: number) {
		await this.profileService.release(id);
		return null;
	}
}

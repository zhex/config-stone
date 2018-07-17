import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	HttpException,
	Param,
	Post,
	Put,
} from '@nestjs/common';
import * as status from 'http-status';
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
		@Body() data: Partial<Profile>,
	) {
		const app = await this.appService.get(appId);
		if (!app) {
			throw new HttpException('invalid app id', status.BAD_REQUEST);
		}
		data.appId = app.id;
		await this.profileService.create(data);
		return null;
	}

	@Put(':id')
	@HttpCode(status.NO_CONTENT)
	public async update(
		@Param('id') id: number,
		@Body() data: Partial<Profile>,
	) {
		await this.profileService.update(id, data);
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

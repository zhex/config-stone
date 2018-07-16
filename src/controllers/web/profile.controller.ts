import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	HttpException,
	Post,
	Put,
	Query,
} from '@nestjs/common';
import * as status from 'http-status';
import { Profile } from '../../entities/profile.entity';
import { AppService } from '../../services/app.service';
import { ProfileService } from '../../services/profile.service';

@Controller('web/api/apps/:appKey/profiles')
export class ProfileController {
	constructor(
		private readonly appService: AppService,
		private readonly profileService: ProfileService,
	) {}

	@Get()
	public async all(@Query('appKey') appKey: string) {
		return this.profileService.all(appKey);
	}

	@Get(':id')
	public async get(@Query('id') id: number) {
		return this.profileService.get(id);
	}

	@Post()
	@HttpCode(status.CREATED)
	public async create(
		@Query('appKey') appKey: string,
		@Body() data: Partial<Profile>,
	) {
		const app = await this.appService.get(appKey);
		if (!app) {
			throw new HttpException('invalid app key', status.BAD_REQUEST);
		}
		data.appKey = app.key;
		await this.profileService.create(data);
		return null;
	}

	@Put()
	@HttpCode(status.NO_CONTENT)
	public async update(
		@Query('id') id: number,
		@Body() data: Partial<Profile>,
	) {
		await this.profileService.update(id, data);
		return null;
	}

	@Delete(':id')
	@HttpCode(status.NO_CONTENT)
	public async delete(@Query('id') id: number) {
		await this.profileService.del(id);
		return null;
	}
}

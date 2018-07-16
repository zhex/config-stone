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
import { Item } from '../../entities/item.entity';
import { ItemService } from '../../services/item.service';
import { ProfileService } from '../../services/profile.service';

@Controller('web/api/apps/:appKey/profiles/:profileKey/items')
export class ItemController {
	constructor(
		private readonly profileService: ProfileService,
		private readonly itemservice: ItemService,
	) {}

	@Get()
	public async all(
		@Query('appKey') appKey: string,
		@Query('profileKey') profileKey: string,
	) {
		return this.itemservice.all(appKey, profileKey);
	}

	@Get(':id')
	public async get(@Query('id') id: number) {
		return this.itemservice.get(id);
	}

	@Post()
	@HttpCode(status.CREATED)
	public async create(
		@Query('appKey') appKey: string,
		@Query('profileKey') profileKey: string,
		@Body() data: Partial<Item>,
	) {
		const profile = await this.profileService.get(appKey, profileKey);
		if (!profile) {
			throw new HttpException('invalid profile key', status.BAD_REQUEST);
		}
		data.appKey = profile.appKey;
		data.profileKey = profile.key;
		await this.itemservice.create(data);
		return null;
	}

	@Put()
	@HttpCode(status.NO_CONTENT)
	public async update(@Query('id') id: number, @Body() data: Partial<Item>) {
		await this.itemservice.update(id, data);
		return null;
	}

	@Delete(':id')
	@HttpCode(status.NO_CONTENT)
	public async delete(@Query('id') id: number) {
		await this.itemservice.del(id);
		return null;
	}
}

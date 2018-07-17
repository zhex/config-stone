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
import { Item } from '../../entities/item.entity';
import { ItemService } from '../../services/item.service';
import { ProfileService } from '../../services/profile.service';

@Controller('web/api/apps/:appId/profiles/:profileId/items')
export class ItemController {
	constructor(
		private readonly profileService: ProfileService,
		private readonly itemservice: ItemService,
	) {}

	@Get()
	public async all(
		@Param('profileId') profileId: number,
	) {
		return this.itemservice.all(profileId);
	}

	@Get(':id')
	public async get(@Param('id') id: number) {
		return this.itemservice.get(id);
	}

	@Post()
	@HttpCode(status.CREATED)
	public async create(
		@Param('profileId') profileId: number,
		@Body() data: Array<Partial<Item>>,
	) {
		const profile = await this.profileService.get(profileId);
		if (!profile) {
			throw new HttpException('invalid profile key', status.BAD_REQUEST);
		}
		data.forEach((d, idx) => {
			d.profileId = profile.id;
			d.order = idx + 1;
		});
		await this.itemservice.create(data);
		return null;
	}

	@Put(':id')
	@HttpCode(status.NO_CONTENT)
	public async update(
		@Param('id') id: number,
		@Body() data: Array<Partial<Item>>,
	) {
		await this.itemservice.update(id, data);
		return null;
	}

	@Delete(':id')
	@HttpCode(status.NO_CONTENT)
	public async delete(@Param('id') id: number) {
		await this.itemservice.del(id);
		return null;
	}
}

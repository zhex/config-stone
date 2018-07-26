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
		private readonly itemService: ItemService,
	) {}

	@Get()
	public async all(
		@Param('profileId') profileId: number,
	) {
		return this.itemService.all(profileId);
	}

	@Get(':id')
	public async get(@Param('id') id: number) {
		return this.itemService.get(id);
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
		await this.itemService.create(data);
		return null;
	}

	@Put()
	@HttpCode(status.NO_CONTENT)
	public async update(
		@Param('profileId') profileId: string,
		@Body() data: Array<Partial<Item>>,
	) {
		await this.itemService.update(Number(profileId), data);
		return null;
	}

	@Delete(':id')
	@HttpCode(status.NO_CONTENT)
	public async delete(@Param('id') id: number) {
		await this.itemService.del(id);
		return null;
	}
}

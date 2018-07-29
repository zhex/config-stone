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
import { ItemDTO } from '../../dto/item.dto';
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
		@Param('appKey') appKey: string,
		@Param('profileKey') profileKey: string,
	) {
		return this.itemService.all(appKey, profileKey);
	}

	@Get(':id')
	public async get(
		@Param('appKey') appKey: string,
		@Param('profileKey') profileKey: string,
		@Param('key') key: string,
	) {
		return this.itemService.get(appKey, profileKey, key);
	}

	@Post()
	@HttpCode(status.CREATED)
	public async create(
		@Param('appKey') appKey: string,
		@Param('profileKey') profileKey: string,
		@Body(new ValidationPipe())
		data: ItemDTO,
	) {
		const profile = await this.profileService.get(appKey, profileKey);
		if (!profile) {
			throw new BadRequestException('invalid profile key');
		}

		const entity = await this.itemService.get(appKey, profileKey, data.key);

		if (entity) {
			throw new BadRequestException(`key "${data.key}" is already exist`);
		}

		const item = plainToClass(Item, data);
		item.appKey = appKey;
		item.profileKey = profileKey;
		await this.itemService.create(item);

		return null;
	}

	@Put(':id')
	@HttpCode(status.NO_CONTENT)
	public async update(
		@Param('appKey') appKey: string,
		@Param('profileKey') profileKey: string,
		@Param('key') key: string,
		@Body(new ValidationPipe())
		data: Partial<ItemDTO>,
	) {
		const item = await this.itemService.get(appKey, profileKey, key);
		if (!item) {
			throw new BadRequestException('invalid param: item key');
		}
		await this.itemService.update(item, data);

		return null;
	}

	@Delete(':id')
	@HttpCode(status.NO_CONTENT)
	public async delete(
		@Param('appKey') appKey: string,
		@Param('profileKey') profileKey: string,
		@Param('key') key: string,
	) {
		await this.itemService.del(appKey, profileKey, key);
		return null;
	}
}

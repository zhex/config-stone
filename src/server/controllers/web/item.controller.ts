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
	public async all(@Param('profileId') profileId: number) {
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
		@Body(new ValidationPipe())
		data: ItemDTO,
	) {
		const profile = await this.profileService.get(profileId);
		if (!profile) {
			throw new BadRequestException('invalid profile key');
		}

		const entity = await this.itemService.findByProfileIdAndKey(
			profileId,
			data.key,
		);

		if (entity) {
			throw new BadRequestException(`key "${data.key}" is already exist`);
		}

		const item = plainToClass(Item, data);
		item.profileId = profileId;
		await this.itemService.create(item);

		return null;
	}

	@Put(':id')
	@HttpCode(status.NO_CONTENT)
	public async update(
		@Param('id') id: number,
		@Body(new ValidationPipe())
		data: Partial<ItemDTO>,
	) {
		const item = await this.itemService.get(id);
		if (!item) {
			throw new BadRequestException('invalid param: item id');
		}
		await this.itemService.update(item, data);

		return null;
	}

	@Delete(':id')
	@HttpCode(status.NO_CONTENT)
	public async delete(@Param('id') id: number) {
		await this.itemService.del(id);
		return null;
	}
}

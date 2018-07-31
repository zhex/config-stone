import {
	BadRequestException,
	Body,
	Controller,
	HttpCode,
	Param,
	Post,
	ValidationPipe,
} from '@nestjs/common';
import * as status from 'http-status';
import { ItemSetDTO } from '../../dto/item-set.dto';
import { ItemService } from '../../services/item.service';
import { ProfileService } from '../../services/profile.service';

@Controller('web/api/apps/:appKey/profiles/:profileKey/itemset')
export class ItemSetController {
	constructor(
		private readonly profileService: ProfileService,
		private readonly itemService: ItemService,
	) {}

	@Post()
	@HttpCode(status.NO_CONTENT)
	public async updateSet(
		@Param('appKey') appKey: string,
		@Param('profileKey') profileKey: string,
		@Body(new ValidationPipe())
		data: ItemSetDTO,
	) {
		const profile = await this.profileService.get(appKey, profileKey);
		if (!profile) {
			throw new BadRequestException('invalid profile key');
		}
		await this.itemService.updateSet(appKey, profileKey, data);
		return null;
	}
}

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

@Controller('web/api/apps/:appId/profiles/:profileId/itemset')
export class ItemSetController {
	constructor(
		private readonly profileService: ProfileService,
		private readonly itemService: ItemService,
	) {}

	@Post()
	@HttpCode(status.NO_CONTENT)
	public async updateSet(
		@Param('profileId') profileId: number,
		@Body(new ValidationPipe())
		data: ItemSetDTO,
	) {
		const profile = await this.profileService.get(profileId);
		if (!profile) {
			throw new BadRequestException('invalid profile key');
		}
		await this.itemService.updateSet(profileId, data);
		return null;
	}
}

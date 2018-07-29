import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { Repository } from 'typeorm';
import { ItemSetDTO } from '../dto/item-set.dto';
import { ItemDTO } from '../dto/item.dto';
import { Item } from '../entities/item.entity';

@Injectable()
export class ItemService {
	constructor(
		@InjectRepository(Item) private readonly itemRepo: Repository<Item>,
	) {}

	public all(appKey: string, profileKey: string) {
		return this.itemRepo.find({ where: { appKey, profileKey } });
	}

	public get(appKey: string, profileKey: string, key: string) {
		return this.itemRepo.findOne({ where: { appKey, profileKey, key } });
	}

	public async create(data: Item) {
		return this.itemRepo.save(data);
	}

	public async update(item: Item, data: Partial<ItemDTO>) {
		item = this.itemRepo.merge(item, data);
		return this.itemRepo.save(item);
	}

	public async updateSet(
		appKey: string,
		profileKey: string,
		data: ItemSetDTO,
	) {
		return this.itemRepo.manager.transaction(async t => {
			if (data.creates) {
				for (const d of data.creates) {
					const item = plainToClass(Item, d);
					item.appKey = appKey;
					item.profileKey = profileKey;
					await t.save(item);
				}
			}

			if (data.updates) {
				for (const d of data.updates) {
					let item = await this.get(appKey, profileKey, d.key);
					item = this.itemRepo.merge(item, d);
					await t.save(item);
				}
			}

			if (data.deletes) {
				for (const d of data.deletes) {
					await t.remove({ appKey, profileKey, key: d.key });
				}
			}
		});
	}

	public async del(appKey: string, profileKey: string, key: string) {
		return this.itemRepo.delete({ appKey, profileKey, key });
	}
}

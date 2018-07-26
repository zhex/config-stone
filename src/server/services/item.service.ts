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

	public all(profileId: number) {
		return this.itemRepo.find({ where: { profileId } });
	}

	public get(id: number) {
		return this.itemRepo.findOne(id);
	}

	public findByProfileIdAndKey(profileId: number, key: string) {
		return this.itemRepo.findOne({
			where: {
				profileId,
				key,
			},
		});
	}

	public async create(data: Item) {
		return this.itemRepo.save(data);
	}

	public async update(item: Item, data: Partial<ItemDTO>) {
		item = this.itemRepo.merge(item, data);
		return this.itemRepo.save(item);
	}

	public async updateSet(profileId: number, data: ItemSetDTO) {
		return this.itemRepo.manager.transaction(async t => {
			if (data.creates) {
				for (const d of data.creates) {
					const item = plainToClass(Item, d);
					item.profileId = profileId;
					await t.save(item);
				}
			}

			if (data.updates) {
				for (const d of data.updates) {
					let item = await this.get(d.id);
					item = this.itemRepo.merge(item, d);
					await t.save(item);
				}
			}

			if (data.deletes) {
				for (const d of data.deletes) {
					const item = await this.findByProfileIdAndKey(
						profileId,
						d.key,
					);
					await t.remove(item);
				}
			}
		});
	}

	public async del(id: number) {
		return this.itemRepo.delete(id);
	}
}

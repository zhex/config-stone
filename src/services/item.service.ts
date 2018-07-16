import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Item } from '../entities/item.entity';

@Injectable()
export class ItemService {
	constructor(
		@InjectRepository(Item)
		private readonly itemRepo: Repository<Item>,
	) {}

	public all(appKey: string, profileKey: string) {
		return this.itemRepo.findOne({ where: { appKey, profileKey }});
	}

	public get(id: number) {
		return this.itemRepo.findOne(id);
	}

	public async create(data: Partial<Item>) {
		return this.itemRepo.save(data);
	}

	public async update(id: number, data: Partial<Item>) {
		let item = await this.get(id);
		item = this.itemRepo.merge(item, data);
		return this.itemRepo.save(item);
	}

	public async del(id: number) {
		return this.itemRepo.delete(id);
	}
}

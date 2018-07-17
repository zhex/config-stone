import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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

	public async create(data: Array<Partial<Item>>) {
		return this.itemRepo.save(data);
	}

	public async update(id: number, data: Array<Partial<Item>>) {
		const items = await Promise.all(
			data.map(d => this.itemRepo.preload(d)),
		);
		return this.itemRepo.save(items);
	}

	public async del(id: number) {
		return this.itemRepo.delete(id);
	}
}

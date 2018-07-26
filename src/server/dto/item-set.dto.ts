import { IsArray, IsOptional } from 'class-validator';
import { ItemDTO } from './item.dto';

export class ItemSetDTO {
	@IsOptional()
	@IsArray()
	public readonly creates: ItemDTO[];

	@IsOptional()
	@IsArray()
	public readonly updates: ItemDTO[];

	@IsOptional()
	@IsArray()
	public readonly deletes: ItemDTO[];
}

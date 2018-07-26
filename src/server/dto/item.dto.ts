import { IsNumber, IsOptional, IsString } from 'class-validator';

export class ItemDTO {
	@IsOptional()
	@IsNumber()
	public readonly id: number;

	@IsString()
	public readonly key: string;

	@IsString()
	public readonly value: string;

	@IsOptional()
	@IsString()
	public readonly comment: string;

	@IsNumber()
	public readonly order: number;
}

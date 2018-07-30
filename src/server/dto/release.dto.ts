import { IsString } from 'class-validator';

export class ReleaseDTO {
	@IsString()
	public readonly name: string;
}

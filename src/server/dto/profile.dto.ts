import { IsString } from 'class-validator';

export class ProfileDTO {
	@IsString()
	public readonly key: string;

	@IsString()
	public readonly name: string;

}

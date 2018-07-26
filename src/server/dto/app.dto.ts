import { IsString } from 'class-validator';

export class AppDTO {
	@IsString()
	public readonly key: string;

	@IsString()
	public readonly name: string;

}

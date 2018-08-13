import { IsEmail, IsString } from "class-validator";

export class UserDTO {
	@IsEmail()
	public readonly email: string;

	@IsString()
	public readonly password: string;

	@IsString()
	public readonly name: string;
}

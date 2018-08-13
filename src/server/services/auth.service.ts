import { Injectable } from '@nestjs/common';
import { User, UserStatus } from '../entities/user.entity';
import { UserService } from './user.service';

export interface IAuthError {
	message: string;
	code: number;
}

@Injectable()
export class AuthService {
	constructor(private readonly userService: UserService) {}

	public async validateUser(
		email: string,
		password: string,
	): Promise<{ error: IAuthError | null; user?: User }> {
		const user = await this.userService.findByEmail(email);
		if (!user) {
			return {
				error: {
					message: 'user does not exist',
					code: 1001,
				},
			};
		}
		if (user.status === UserStatus.DISABLED) {
			return {
				error: {
					message: 'user account is forbiddened',
					code: 1002,
				},
			};
		}
		if (!user.comparePassword(password)) {
			return {
				error: {
					message: 'incorrect password',
					code: 1003,
				},
			};
		}
		return { error: null, user };
	}
}

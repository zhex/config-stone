import { Injectable } from '@nestjs/common';
import * as passport from 'passport';
import { Strategy } from 'passport-local';
import { User } from '../entities/user.entity';
import { UserService } from '../services/user.service';

@Injectable()
export class LocalStrategy extends Strategy {
	constructor(
		private readonly userService: UserService,
	) {
		super(
			{ usernameField: 'email', passwordField: 'password' },
			(email, password, done) => this.verify(email, password, done),
		);

		passport.use(this);

		passport.serializeUser((user: User, done) => {
			done(null, user.id);
		});

		passport.deserializeUser(async (id: number, done) => {
			try {
				const user = await userService.find(id);
				done(null, user ? user.toJSON() : null);
			} catch (err) {
				done(err);
			}
		});
	}

	public async verify(email: string, password: string, done: any) {
		const result = await this.userService.validateUser(email, password);
		if (result.error) {
			done(null, false, result.error);
		} else {
			done(null, result.user);
		}
	}
}

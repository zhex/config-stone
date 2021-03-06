import { Module, NestModule, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NextFunction, Request, Response } from 'express';
import * as passport from 'passport';
import { ConfigController } from './controllers/config.controller';
import { AppController } from './controllers/web/app.controller';
import { AuthController } from './controllers/web/auth.controller';
import { ItemController } from './controllers/web/item.controller';
import { ProfileController } from './controllers/web/profile.controller';
import { UserController } from './controllers/web/user.controller';
import { AppUser } from './entities/app-user.entity';
import { App } from './entities/app.entity';
import { Item } from './entities/item.entity';
import { Profile } from './entities/profile.entity';
import { ReleaseHistory } from './entities/release-history.entity';
import { Release } from './entities/release.entity';
import { User } from './entities/user.entity';
import { LocalStrategy } from './passport/local.strategy';
import { AppService } from './services/app.service';
import { EtcdService } from './services/etcd.service';
import { ItemService } from './services/item.service';
import { NotifyService } from './services/notify.service';
import { ProfileService } from './services/profile.service';
import { ReleaseService } from './services/release.service';
import { UserService } from './services/user.service';

@Module({
	imports: [
		TypeOrmModule.forRoot(),
		TypeOrmModule.forFeature([
			App,
			Profile,
			Item,
			Release,
			ReleaseHistory,
			User,
			AppUser,
		]),
	],
	controllers: [
		AuthController,
		AppController,
		ProfileController,
		ItemController,
		ConfigController,
		UserController,
	],
	providers: [
		AppService,
		ProfileService,
		ItemService,
		EtcdService,
		NotifyService,
		ReleaseService,
		UserService,
		LocalStrategy,
	],
})
export class ApplicationModule implements NestModule {
	public configure(consumer) {
		consumer.apply(this.authorize).forRoutes({
			path: '/web/api/session/authorize',
			method: RequestMethod.POST,
		});
	}

	private authorize(req: Request, res: Response, next: NextFunction) {
		passport.authenticate('local', (err, user, info) => {
			if (err) {
				return next(err);
			}
			if (!user) {
				return res.status(401).json(info);
			}

			req.login(user, error => {
				if (error) {
					return next(error);
				}
				return res.json(user);
			});
		})(req, res, next);
	}
}

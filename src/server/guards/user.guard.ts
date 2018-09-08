import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class UserGuard implements CanActivate {
	public canActivate(ctx: ExecutionContext) {
		const req = ctx.switchToHttp().getRequest();
		return !!req.user;
	}
}

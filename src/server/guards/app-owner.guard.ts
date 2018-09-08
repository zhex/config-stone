import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { AppService } from '../services/app.service';

@Injectable()
export class AppOwnerGuard implements CanActivate {
	constructor(private readonly appService: AppService) {}

	public async canActivate(ctx: ExecutionContext) {
		const req: Request = ctx.switchToHttp().getRequest();
		const userId = await this.appService.getOwnerId(req.params.key);
		return req.user.id === userId;
	}
}

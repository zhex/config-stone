import { Controller, Delete, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { UserGuard } from '../../guards/user.guard';

@Controller('web/api/session')
@UseGuards(UserGuard)
export class AuthController {
	@Delete('logout')
	public logout(@Req() req: Request, @Res() res: Response) {
		req.logOut();
		res.status(200).end();
	}
}

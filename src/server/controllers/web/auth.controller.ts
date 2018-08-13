import { Controller, Delete, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';

@Controller('api/session')
export class AuthController {
    @Delete('logout')
    public logout(@Req() req: Request, @Res() res: Response) {
        req.logOut();
        res.status(200).end();
    }
}

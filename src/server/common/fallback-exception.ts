import {
	ArgumentsHost,
	Catch,
	ExceptionFilter,
	HttpException,
	NotFoundException,
} from '@nestjs/common';
import * as fs from 'fs';
import { join } from 'path';

@Catch(NotFoundException)
export class FallbackException implements ExceptionFilter {
	public catch(ex: HttpException, host: ArgumentsHost) {
		const ctx = host.switchToHttp();
		const res = ctx.getResponse();
		const req = ctx.getRequest();
		const status = ex.getStatus();
		if (
			(req.method === 'GET' || req.method === 'HEAD') &&
			req.accepts('html')
		) {
			const content = fs.readFileSync(
				join(__dirname, '../../ui/index.html'),
			);
			res.set('Content-Type', 'text/html');
			res.send(content);
		} else {
			res.status(status).json({
				status,
				message: 'not found',
			});
		}
	}
}

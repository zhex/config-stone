import {
	BadRequestException,
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	Param,
	Post,
	Put,
	Req,
	UseGuards,
	ValidationPipe,
} from '@nestjs/common';
import { Request } from 'express';
import * as status from 'http-status';
import { AppDTO } from '../../dto/app.dto';
import { AppOwnerGuard } from '../../guards/app-owner.guard';
import { UserGuard } from '../../guards/user.guard';
import { AppService } from '../../services/app.service';

@Controller('web/api/apps')
@UseGuards(UserGuard)
export class AppController {
	constructor(private readonly appService: AppService) {}

	@Get()
	public async all(@Req() req: Request) {
		return req.user.isAdmin
			? this.appService.all()
			: this.appService.getOwnerId(req.user.id);
	}

	@Get(':key')
	public async get(@Param('key') key: string) {
		return this.appService.get(key);
	}

	@Post()
	@HttpCode(status.CREATED)
	public async create(@Body(new ValidationPipe()) data: AppDTO, @Req() req: Request) {
		await this.appService.create(data, req.user);
		return null;
	}

	@Put(':key')
	@UseGuards(AppOwnerGuard)
	@HttpCode(status.NO_CONTENT)
	public async update(
		@Param('key') key: string,
		@Body(new ValidationPipe()) data: Partial<AppDTO>,
	) {
		const app = await this.appService.get(key);
		if (!app) {
			throw new BadRequestException('invalid app key');
		}
		await this.appService.update(app, data);
		return null;
	}

	@Delete(':key')
	@UseGuards(AppOwnerGuard)
	@HttpCode(status.NO_CONTENT)
	public async delete(@Param('key') key: string) {
		await this.appService.del(key);
		return null;
	}
}

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
	ValidationPipe,
} from '@nestjs/common';
import * as status from 'http-status';
import { AppDTO } from '../../dto/app.dto';
import { AppService } from '../../services/app.service';

@Controller('web/api/apps')
export class AppController {
	constructor(private readonly appService: AppService) {}

	@Get()
	public async all() {
		const apps = await this.appService.all();
		return apps;
	}

	@Get(':id')
	public async get(@Param('id') id: number) {
		return this.appService.get(id);
	}

	@Post()
	@HttpCode(status.CREATED)
	public async create(
		@Body(new ValidationPipe())
		data: AppDTO,
	) {
		await this.appService.create(data);
		return null;
	}

	@Put(':id')
	@HttpCode(status.NO_CONTENT)
	public async update(
		@Param('id') id: number,
		@Body(new ValidationPipe())
		data: Partial<AppDTO>,
	) {
		const app = await this.get(id);
		if (!app) {
			throw new BadRequestException('invalid app id');
		}
		await this.appService.update(app, data);
		return null;
	}

	@Delete(':id')
	@HttpCode(status.NO_CONTENT)
	public async delete(@Param('id') id: number) {
		await this.appService.del(id);
		return null;
	}
}

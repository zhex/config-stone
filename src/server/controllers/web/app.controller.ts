import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	Param,
	Post,
	Put,
} from '@nestjs/common';
import * as status from 'http-status';
import { App } from '../../entities/app.entity';
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
	public async create(@Body() data: Partial<App>) {
		await this.appService.create(data);
		return null;
	}

	@Put(':id')
	@HttpCode(status.NO_CONTENT)
	public async update(@Param('id') id: number, @Body() data: Partial<App>) {
		await this.appService.update(id, data);
		return null;
	}

	@Delete(':id')
	@HttpCode(status.NO_CONTENT)
	public async delete(@Param('id') id: number) {
		await this.appService.del(id);
		return null;
	}
}

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
import { UserDTO } from '../../dto/user.dto';
import { UserService } from '../../services/user.service';

@Controller('web/api/users')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Get()
	public async all() {
		return this.userService.findAll();
	}

	@Get(':id')
	public async get(@Param('id') id: number) {
		return this.userService.find(id);
	}

	@Post()
	@HttpCode(status.CREATED)
	public async create(@Body() data: UserDTO) {
		const user = await this.userService.create(data);
		return user.id;
	}

	@Put(':id')
	@HttpCode(status.NO_CONTENT)
	public async edit(@Param('id') id: number, @Body() data: UserDTO) {
		await this.userService.update(id, data);
		return;
	}

	@Delete(':id')
	@HttpCode(status.NO_CONTENT)
	public async delete(@Param('id') id: number) {
		await this.userService.delete(id);
		return;
	}
}

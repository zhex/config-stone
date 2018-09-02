import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDTO } from '../dto/user.dto';
import { User, UserStatus } from '../entities/user.entity';

@Injectable()
export class UserService {
	constructor(
		@InjectRepository(User) private readonly userRepository: Repository<User>,
	) {}

	public async findByEmail(email: string): Promise<User> {
		return this.userRepository.findOne({ email });
	}

	public find(id: number): Promise<User> {
		return this.userRepository.findOne(id);
	}

	public findAll(): Promise<User[]> {
		return this.userRepository.find();
	}

	public create(data: UserDTO): Promise<User> {
		const user = this.userRepository.create(data);
		return this.userRepository.save(user);
	}

	public async update(id: number, data: UserDTO): Promise<User> {
		let user = await this.find(id);
		user = this.userRepository.merge(user, data);
		if (data.password) {
			user.password = User.encryptPassword(data.password);
		}
		return this.userRepository.save(user);
	}

	public delete(id: number) {
		return this.userRepository.delete(id);
	}

	public async validateUser(email: string, password: string) {
		const user = await this.findByEmail(email);
		if (!user) {
			return {
				error: {
					message: "user does not exist",
					code: 1001
				}
			};
		}
		if (user.status === UserStatus.DISABLED) {
			return {
				error: {
					message: "user account is not activated",
					code: 1002
				}
			};
		}
		if (!user.comparePassword(password)) {
			return {
				error: {
					message: "incorrect password",
					code: 1003
				}
			};
		}
		return { error: null, user };
	}
}

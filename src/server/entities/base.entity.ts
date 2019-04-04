import { classToPlain } from 'class-transformer';
import {
	CreateDateColumn,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';

export abstract class Base {
	@PrimaryGeneratedColumn() public id: number;

	@CreateDateColumn({ name: 'created_at' })
	public createdAt: Date;

	@UpdateDateColumn({ name: 'updated_at' })
	public updatedAt: Date;

	public toJSON() {
		return classToPlain(this);
	}
}

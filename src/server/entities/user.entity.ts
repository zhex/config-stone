import { compareSync, hashSync } from 'bcrypt';
import { Exclude } from 'class-transformer';
import { BeforeInsert, Column, Entity } from 'typeorm';
import { Base } from './base.entity';

export enum UserStatus {
	DISABLED = 0,
	ENABLED = 1,
}

@Entity('users')
export class User extends Base {
	public static encryptPassword(pass: string): string {
        return hashSync(pass, 5);
    }

	@Column('varchar', { length: 100,  unique: true })
	public email: string;

	@Column('varchar', { length: 100 })
	@Exclude()
	public password: string;

	@Column('varchar', { length: 100 })
	public name: string;

	@Column('tinyint', { width: 1, default: UserStatus.ENABLED })
	public status: UserStatus;

	@Column('tinyint', { name: 'is_admin', width: 1, default: 0 })
	public isAdmin: number;

	public comparePassword(pass: string): boolean {
        return compareSync(pass, this.password);
	}

	@BeforeInsert()
    private beforeCreate() {
        this.password = User.encryptPassword(this.password);
    }
}

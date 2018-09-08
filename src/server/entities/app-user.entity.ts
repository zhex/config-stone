import { Column, Entity } from 'typeorm';
import { Base } from './base.entity';

@Entity('app_users')
export class AppUser extends Base {
	@Column('varchar', { name: 'app_key' })
	public appKey: string;

	@Column('int', { name: 'user_id' })
	public userId: number;

	@Column('tinyint', { width: 1, name: 'is_owner', default: 0 })
	public isOwner: number;
}

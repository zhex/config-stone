import { Column, Entity, Unique } from 'typeorm';
import { Base } from './base.entity';

@Entity('profiles')
@Unique('app_profile_key', ['key', 'appKey'])
export class Profile extends Base {
	@Column('varchar', { length: 100 })
	public name: string;

	@Column('varchar', { length: 100 })
	public key: string;

	@Column('varchar', { name: 'app_key' })
	public appKey: string;
}

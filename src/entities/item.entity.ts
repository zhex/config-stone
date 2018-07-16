import { Column, Entity } from 'typeorm';
import { Base } from './base.entity';

@Entity('items')
export class Item extends Base {
	@Column('varchar')
	public key: string;

	@Column('longtext')
	public value: string;

	@Column('int')
	public order: number;

	@Column('varchar', { name: 'app_key', length: 100 })
	public appKey: string;

	@Column('varchar', { name: 'profile_key', length: 100 })
	public profileKey: string;
}

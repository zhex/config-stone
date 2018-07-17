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

	@Column('int', { name: 'profile_id' })
	public profileId: number;
}

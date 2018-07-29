import { Column, Entity, Unique } from 'typeorm';
import { Base } from './base.entity';

@Entity('items')
@Unique('app_profile_item_key', ['appKey', 'profileKey', 'key'])
export class Item extends Base {
	@Column('varchar')
	public key: string;

	@Column('longtext')
	public value: string;

	@Column('text', { nullable: true })
	public comment: string;

	@Column('int')
	public order: number;

	@Column('varchar')
	public appKey: string;

	@Column('varchar')
	public profileKey: string;
}

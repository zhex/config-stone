import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Base } from './base.entity';
import { Profile } from './profile.entity';

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

	@ManyToOne(() => Profile)
	@JoinColumn({ name: 'profile_id' })
	public profile?: Profile;
}

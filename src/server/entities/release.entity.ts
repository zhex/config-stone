import { Column, Entity, Index } from 'typeorm';
import { Base } from './base.entity';

export enum ReleaseTypes {
	Normal = 1,
	Discard = 0,
}

@Entity('releases')
@Index('app_profile_key', ['appKey', 'profileKey'])
export class Release extends Base {
	@Column('varchar')
	public appKey: string;

	@Column('varchar')
	public profileKey: string;

	@Column('varchar')
	public name: string;

	@Column('longtext')
	public data: string;

	@Column('tinyint', { width: 1, default: ReleaseTypes.Normal })
	public status: ReleaseTypes;
}

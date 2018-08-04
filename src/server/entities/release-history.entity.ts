import { Column, Entity, Index } from 'typeorm';
import { Base } from './base.entity';

export enum ReleaseHistoryTypes {
	Normal = 1,
	Revert = 2,
	Gray = 3,
	GrayMerge = 4,
	GrayDrop = 5,
}

@Entity('release_histories')
@Index('app_profile_release_history_key', ['appKey', 'profileKey'])
export class ReleaseHistory extends Base {
	@Column('varchar') public appKey: string;

	@Column('varchar') public profileKey: string;

	@Column('int', { name: 'release_id' })
	public releaseId: number;

	@Column('int', { name: 'prev_release_id', default: 0 })
	public prevReleaseId: number;

	@Column('tinyint', {
		width: 1,
		name: 'type',
		default: ReleaseHistoryTypes.Normal,
	})
	public type: ReleaseHistoryTypes;
}

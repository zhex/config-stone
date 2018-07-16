import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { App } from './app.entity';
import { Base } from './base.entity';

@Entity('profiles')
export class Profile extends Base {
	@Column('varchar', { length: 100 })
	public name: string;

	@Column('varchar', { length: 100 })
	public key: string;

	@Column('varchar', { name: 'app_key', length: 100 })
	public appKey: string;

	@ManyToOne(() => App)
	@JoinColumn({ referencedColumnName: 'key', name: 'app_key' })
	public app?: App;
}

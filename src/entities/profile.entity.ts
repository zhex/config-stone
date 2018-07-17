import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { App } from './app.entity';
import { Base } from './base.entity';
import { Item } from './item.entity';

@Entity('profiles')
export class Profile extends Base {
	@Column('varchar', { length: 100 })
	public name: string;

	@Column('varchar', { length: 100 })
	public key: string;

	@Column('int', { name: 'app_id' })
	public appId: number;

	@ManyToOne(() => App)
	@JoinColumn({ name: 'app_id' })
	public app?: App;

	@OneToMany(() => Item, item =>item.profile)
	public items?: Item[];
}

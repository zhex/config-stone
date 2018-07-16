import { Column, Entity, OneToMany } from 'typeorm';
import { Base } from './base.entity';
import { Profile } from './profile.entity';

@Entity('apps')
export class App extends Base {
	@Column('varchar', { length: 100 })
	public name: string;

	@Column('varchar', { length: 100, unique: true })
	public key: string;

	@OneToMany(() => Profile, profile => profile.app)
	public profiles: Profile[];
}

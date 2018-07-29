import { Column, Entity } from 'typeorm';
import { Base } from './base.entity';

@Entity('apps')
export class App extends Base {
	@Column('varchar', { length: 100 })
	public name: string;

	@Column('varchar', { length: 100, unique: true })
	public key: string;
}

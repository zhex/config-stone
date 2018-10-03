import { plainToClass } from 'class-transformer';
import { createConnection } from 'typeorm';
import { User } from '../server/entities/user.entity';

(async () => {
	const conn = await createConnection();

	const admin = plainToClass(User, {
		email: 'zhex81@gmail.com',
		password: 'admin',
		name: 'ZheX',
		isAdmin: 1,
	});

	await conn.manager.save(admin);
	conn.close();
})();

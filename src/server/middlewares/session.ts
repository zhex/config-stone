export function sessionMiddlware() {
	const session = require('express-session');
	const Store = require('express-mysql-session')(session);

	const opts = {
		host: process.env.MYSQL_DB_HOST,
		port: process.env.MYSQL_DB_PORT,
		user: process.env.MYSQL_DB_USER,
		password: process.env.MYSQL_DB_PASSWORD,
		database: process.env.MYSQL_DB_NAME,
	};

	const sessionStore = new Store(opts);

	return session({
		key: 'config_stone',
		secret: 'config_stone_secret',
		store: sessionStore,
		resave: false,
		saveUninitialized: false
	});
}

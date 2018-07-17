module.exports = {
	type: 'mysql',
    host: process.env.MYSQL_DB_HOST,
    port: process.env.MYSQL_DB_PORT,
    username: process.env.MYSQL_DB_USER,
    password: process.env.MYSQL_DB_PASSWORD,
    database: process.env.MYSQL_DB_NAME,
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    timezone: 'Z',
	synchronize: process.env.NODE_ENV === 'development',
};

module.exports = {
	type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'root',
    database: 'config-stone',
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    timezone: 'Z',
	synchronize: process.env.NODE_ENV === 'development',
};

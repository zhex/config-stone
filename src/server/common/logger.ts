import { createLogger, format, transports } from 'winston';

function replaceErrors(key, value) {
	if (value instanceof Buffer) {
		return value.toString('base64');
	} else if (value instanceof Error) {
		const error = {};
		Object.getOwnPropertyNames(value).forEach(k => {
			error[k] = value[k];
		});
		return error;
	}
	return value;
}

const style = format.printf(info => {
	let msg = info.message;
	if (info.error) {
		msg = `${info.error.stack}`;
	}
	return `[App] ${process.pid}\t- ${info.timestamp}\t${info.level}: ${msg}`;
});

export const logger = createLogger({
	level: process.env.LOG_LEVEL || 'debug',
	format: format.combine(
		format.colorize(),
		format.json({ replacer: replaceErrors }),
		format.align(),
		format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
		style,
	),
	transports: [new transports.Console()],
});

export class LogStream {
	public write(msg: string) {
		logger.info(msg.replace('\n', ''));
	}
}

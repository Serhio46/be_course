const winston = require('winston');
const path = require('path');

const logger = winston.createLogger({
	level: 'error',
	format: winston.format.combine(
		winston.format.timestamp({
			format: 'YYYY-MM-DD HH:mm:ss',
		}),
		winston.format.errors({ stack: true }),
		winston.format.json()
	),
	transports: [new winston.transports.File({ filename: path.join(__dirname, '..', '..', 'logs', 'errors.log') })],
});

if (process.env.NODE_ENV !== 'production') {
	logger.add(new winston.transports.Console({ format: winston.format.simple() }));
}

module.exports = logger;

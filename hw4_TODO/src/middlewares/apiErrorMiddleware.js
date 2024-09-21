const Sentry = require('@sentry/node');

const ApiError = require('../exceptions/apiError');
const logger = require('../utils/loggers/logger');

const apiErrorMiddleware = (err, req, res, next) => {
	if (process.env.NODE_ENV === 'production') {
		Sentry.captureException(err);
	} else {
		logger.error(err);
	}

	if (err instanceof ApiError) {
		return res.status(err.status).json({ message: err.message, errors: err.errors });
	}
	return res.status(500).json({ message: 'Unexpected error' });
};

module.exports = apiErrorMiddleware;

const ApiError = require('../exceptions/apiError');
const Sentry = require('@sentry/node');

const apiErrorMiddleware = (err, req, res, next) => {
	if (err instanceof ApiError) {
		Sentry.captureException(err);
		return res.status(err.status).json({ message: err.message, errors: err.errors });
	}
	Sentry.captureException(err);
	return res.status(500).json({ message: 'Unexpected error' });
};

module.exports = apiErrorMiddleware;

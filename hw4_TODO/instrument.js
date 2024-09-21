const Sentry = require('@sentry/node');
const { nodeProfilingIntegration } = require('@sentry/profiling-node');

const initSentry = dsn => {
	Sentry.init({
		dsn,
		integrations: [nodeProfilingIntegration()],
	});
};

module.exports = initSentry;

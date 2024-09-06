const loggerMiddleware = (req, res, next) => {
	console.log(`requested URL - ${req.url}`);
	next();
};

module.exports = loggerMiddleware;

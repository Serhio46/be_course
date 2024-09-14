const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
	try {
		const authHeader = req.headers.authorization;
		const token = authHeader && authHeader.split(' ')[1];

		if (token == null) return res.status(401).send('Unauthorized');

		jwt.verify(token, process.env.JWT_ACCESS_SECRET, (err, { userName, id }) => {
			if (err) next(new Error('invalid token'));
			req.userName = userName;
			req.id = id;
			next();
		});
	} catch (e) {
		res.status(403).send('Forbidden');
	}
};

module.exports = authenticateToken;

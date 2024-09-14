const UserService = require('../services/UserService');

class UserController {
	async register(req, res, next) {
		try {
			const { userName, password } = req.body;
			const result = await UserService.registerUser({ userName, password });
			res.json(result).status(201);
		} catch (e) {
			next(e);
		}
	}

	async login(req, res, next) {
		try {
			const { userName, password } = req.body;
			const result = await UserService.loginUser({ userName, password });
			res.json(result).status(200);
		} catch (e) {
			next(e);
		}
	}
}

module.exports = new UserController();

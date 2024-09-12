const UserService = require('../services/UserService');

class UserController {
	async register(req, res) {
		try {
			const { userName, password } = req.body;
			const result = await UserService.registerUser({ userName, password });
			res.json(result).status(201);
		} catch (e) {
			res.status(400).json({ message: e.message });
		}
	}

	async login(req, res) {
		try {
			const { userName, password } = req.body;
			const result = await UserService.loginUser({ userName, password });
			res.json(result).status(200);
		} catch (e) {
			res.status(400).json({ message: e.message });
		}
	}
}

module.exports = new UserController();

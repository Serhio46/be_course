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

	async updateUserById(req, res, next) {
		try {
			const { id } = req.params;
			const { updates } = req.body;
			const userId = req.id;

			const result = await UserService.updateUserById({ id, updates, userId });
			res.json(result).status(200);
		} catch (e) {
			next(e);
		}
	}

	async deleteUserById(req, res, next) {
		try {
			const { id } = req.params;
			const userId = req.id;

			await UserService.deleteUserById(id, userId);
			res.json({ message: 'User has been deleted' }).sendStatus(200);
		} catch (e) {
			next(e);
		}
	}
}

module.exports = new UserController();

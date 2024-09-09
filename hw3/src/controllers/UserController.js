const UserService = require('../services/UserService');

class UserController {
	async createUser(req, res) {
		const result = await UserService.createUser(req.body);
		res.json(result).status(201);
	}

	async getUsers(req, res) {
		const { limit, page } = req.query;
		const result = await UserService.getUsers(limit, page);

		if (!result?.length) {
			return res.status(404).json({ message: 'Users not found' });
		}

		res.json(result);
	}
	async getUserById(req, res) {
		const { id } = req.params;
		const result = await UserService.getUserById(id);

		if (!result) {
			return res.status(404).json({ message: 'User not found' });
		}

		res.json(result).status(200);
	}
	async updateUserById(req, res) {
		const { id } = req.params;
		const result = await UserService.updateUserById(id, req.body);

		if (!result) {
			return res.status(404).json({ message: 'User not found' });
		}

		res.json(result).status(200);
	}

	async deleteUserById(req, res) {
		const { id } = req.params;
		const result = await UserService.deleteUserById(id);

		if (!result) {
			return res.status(404).json({ message: 'User not found' });
		}

		res.json({ message: 'User has been deleted' }).status(204);
	}
}

module.exports = new UserController();

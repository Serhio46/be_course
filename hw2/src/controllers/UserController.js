const UserService = require('../services/UserService');

class UserController {
	createUser(req, res) {
		const createdUser = UserService.createUser(req.body);
		res.json(createdUser).status(201);
	}

	getUsers(req, res) {
		const users = UserService.getUsers();
		res.json(users);
	}

	getUserById(req, res) {
		const id = req.params.id;
		const user = UserService.getUserById(id);

		if (!user) {
			res.json({ message: 'User not found' });
			return;
		}

		res.json(user);
	}

	updateUserById(req, res) {
		const id = req.params.id;
		const newData = req.body;
		const updatedUser = UserService.updateUserById(id, newData);

		if (!updatedUser) {
			res.json({ message: 'User not found' });
			return;
		}

		res.json(updatedUser);
	}

	updatePasswordById(req, res) {
		const id = req.params.id;
		const { password } = req.body;
		const updatedUser = UserService.updatePasswordById(id, password);

		if (!updatedUser) {
			res.json({ message: 'User not found' });
			return;
		}

		res.json(updatedUser);
	}

	deleteUserById(req, res) {
		const id = req.params.id;
		const deletedUser = UserService.deleteUserById(id);

		if (!deletedUser) {
			res.json({ message: 'User not found' });
			return;
		}

		res.json({ message: 'User deleted' });
	}
}

module.exports = new UserController();

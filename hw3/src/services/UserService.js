const User = require('../models/User');
const { v4: uuidv4 } = require('uuid');
const fileHelper = require('../helpers/fileHelper');
const dbHelper = require('../helpers/dbHelper');

class UserService {
	async createUser({ name, email, password }) {
		const id = uuidv4();
		const newUser = new User(id, name, email, password);
		const db = await fileHelper.readFile('db.json');
		return await fileHelper.writeFile('db.json', dbHelper.addNewEntry(db, newUser, 'users'));
	}

	async getUsers() {
		const { users } = await fileHelper.readFile('db.json');
		return users;
	}

	async getUserById(id) {
		const { users } = await fileHelper.readFile('db.json');
		return users.find(user => user.id === id);
	}

	async updateUserById(id, body) {
		const db = await fileHelper.readFile('db.json');

		if (!db.users.find(user => user.id === id)) {
			return null;
		}

		return await fileHelper.writeFile('db.json', dbHelper.updateEntry(db, { ...body, id }, 'users'));
	}

	async deleteUserById(id) {
		const db = await fileHelper.readFile('db.json');

		if (!db.users.find(user => user.id === id)) {
			return null;
		}

		return await fileHelper.writeFile('db.json', dbHelper.deleteEntry(db, id, 'users'));
	}
}

module.exports = new UserService();

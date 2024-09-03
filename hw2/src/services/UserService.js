const fs = require('fs');
const path = require('path');

const User = require('../models/User');
const { modifyUser } = require('../helpers');

const dataFilePath = path.join(__dirname, '../db.json');

class UserService {
	//TODO move to helpers
	_readData() {
		const data = fs.readFileSync(dataFilePath, 'UTF-8');
		return JSON.parse(data);
	}

	_writeData(data) {
		fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
	}

	createUser(user) {
		const data = this._readData();
		const { username, email, id, password } = user;
		const newUser = new User(username, email, id, password);
		const updates = {
			...data,
			users: [...data.users, newUser],
		};
		this._writeData(updates);
		return user;
	}

	getUsers() {
		const data = this._readData();
		return data.users;
	}

	getUserById(id) {
		const data = this._readData();
		return data.users.find(user => user.id === +id);
	}

	updateUserById(id, newData) {
		const data = this._readData();
		const userIndex = data.users.findIndex(user => user.id === +id);

		if (userIndex === -1) return null;

		const updates = modifyUser(data.users, id, newData);
		this._writeData({ ...data, users: updates });
		return updates[userIndex];
	}

	updatePasswordById(id, password) {
		const data = this._readData();
		const userIndex = data.users.findIndex(user => user.id === +id);

		if (userIndex === -1) return null;

		const updates = modifyUser(data.users, id, password, 'password');
		this._writeData({ ...data, users: updates });
		return updates[userIndex];
	}

	deleteUserById(id) {
		const data = this._readData();
		const userIndex = data.users.findIndex(user => user.id === +id);

		if (userIndex === -1) return null;

		const updates = data.users.filter(user => user.id !== +id);
		this._writeData({ ...data, users: updates });
		return true;
	}
}

module.exports = new UserService();

const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');

const fileHelper = require('../helpers/fileHelper');
const dbHelper = require('../helpers/dbHelper');
const User = require('../models/User');
const TokenHelper = require('../helpers/tokenHelper');
const UserDto = require('../dtos/user-dto');

class UserService {
	async registerUser({ userName, password }) {
		try {
			const db = await fileHelper.readFile('db.json');
			const candidateIndex = db.users.findIndex(user => user.userName === userName);

			if (candidateIndex !== -1) {
				throw new Error('User already exists');
			}

			const hashedPassword = await bcrypt.hash(password, 3);
			const newUser = new User({ userName, password: hashedPassword, id: uuidv4() });
			await fileHelper.writeFile('db.json', dbHelper.addNewEntry(db, newUser, 'users'));

			const userDto = new UserDto(newUser);
			const { accessToken } = TokenHelper.generateTokens({ ...userDto });
			return { user: userDto, accessToken };
		} catch (e) {
			throw new Error(e.message);
		}
	}

	async loginUser({ userName, password }) {
		try {
			const db = await fileHelper.readFile('db.json');
			const user = db.users.find(user => user.userName === userName);

			if (!user) {
				throw new Error('Incorrect username or password');
			}

			const isPasswordValid = await bcrypt.compare(password, user.password);

			if (!isPasswordValid) {
				throw new Error('Incorrect username or password');
			}

			const userDto = new UserDto(user);
			const { accessToken } = TokenHelper.generateTokens({ ...userDto });
			return { user: userDto, accessToken };
		} catch (e) {
			throw new Error(e.message);
		}
	}
}

module.exports = new UserService();

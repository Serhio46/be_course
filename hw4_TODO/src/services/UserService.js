const bcrypt = require('bcrypt');

const User = require('../models/User');
const TokenHelper = require('../helpers/tokenHelper');
const UserDto = require('../dtos/user-dto');
const ApiError = require('../exceptions/apiError');
const { getConnection, useDefaultDb, ObjectId } = require('../helpers/mongoHelper');

class UserService {
	#COLLECTION = 'users';

	async registerUser({ userName, password }) {
		let connection;
		try {
			connection = await getConnection();
			const db = useDefaultDb(connection);
			const candidate = await db.collection(this.#COLLECTION).findOne({ userName });

			if (candidate) {
				throw ApiError.BadRequest('User already exists');
			}

			const hashedPassword = await bcrypt.hash(password, 3);
			const newUser = new User({ userName, password: hashedPassword });
			const { insertedId } = await db.collection(this.#COLLECTION).insertOne(newUser);
			connection.close();

			const userDto = new UserDto({ ...newUser, _id: insertedId });
			const { accessToken } = TokenHelper.generateTokens({ ...userDto });
			return { user: userDto, accessToken };
		} catch (e) {
			throw e;
		} finally {
			connection.close();
		}
	}

	async loginUser({ userName, password }) {
		let connection;
		try {
			connection = await getConnection();
			const db = useDefaultDb(connection);
			const user = await db.collection(this.#COLLECTION).findOne({ userName });
			connection.close();

			if (!user) {
				throw ApiError.BadRequest('Incorrect username or password');
			}

			const isPasswordValid = await bcrypt.compare(password, user.password);

			if (!isPasswordValid) {
				throw ApiError.BadRequest('Incorrect username or password');
			}

			const userDto = new UserDto(user);
			const { accessToken } = TokenHelper.generateTokens({ ...userDto });
			return { user: userDto, accessToken };
		} catch (e) {
			throw e;
		} finally {
			connection.close();
		}
	}

	async updateUserById({ id, updates, userId }) {
		let connection;
		try {
			connection = await getConnection();
			const db = useDefaultDb(connection);

			if (!ObjectId.isValid(id)) {
				throw ApiError.BadRequest('Wrong id format');
			}

			const user = await db.collection(this.#COLLECTION).findOne({ _id: new ObjectId(id) });

			if (!user) {
				throw ApiError.BadRequest('User not found');
			}

			if (user._id.toString() !== userId) {
				throw ApiError.ForbiddenError('You do not have permission to update this user');
			}

			let password = updates.password;
			if (password) {
				password = await bcrypt.hash(updates.password, 3);
			}

			const updatedUser = await db
				.collection(this.#COLLECTION)
				.findOneAndUpdate(
					{ _id: new ObjectId(id) },
					{ $set: { ...updates, ...(password ? { password } : {}) } },
					{ returnDocument: 'after' }
				);

			const userDto = new UserDto(updatedUser);
			const { accessToken } = TokenHelper.generateTokens({ ...userDto });
			return { user: userDto, accessToken };
		} catch (e) {
			throw e;
		} finally {
			connection.close();
		}
	}

	async deleteUserById(id, userId) {
		let connection;
		try {
			connection = await getConnection();
			const db = useDefaultDb(connection);

			if (!ObjectId.isValid(id)) {
				throw ApiError.BadRequest('Wrong id format');
			}

			const user = await db.collection(this.#COLLECTION).findOne({ _id: new ObjectId(id) });

			if (!user) {
				throw ApiError.BadRequest('User not found');
			}

			if (user._id.toString() !== userId) {
				throw ApiError.ForbiddenError('You do not have permission to delete this user');
			}

			await db.collection(this.#COLLECTION).deleteOne({ _id: new ObjectId(id) });
		} catch (e) {
			throw e;
		} finally {
			connection.close();
		}
	}
}

module.exports = new UserService();

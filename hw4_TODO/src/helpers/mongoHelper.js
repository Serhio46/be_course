const { MongoClient, ObjectId } = require('mongodb');

const mongoHelper = {
	async getConnection() {
		return MongoClient.connect(process.env.MONGO_CONNECTION_STRING, {
			useUnifiedTopology: true,
		});
	},
	useDefaultDb(connection) {
		return connection.db(process.env.MONGO_DB_NAME);
	},
	ObjectId,
};

module.exports = mongoHelper;

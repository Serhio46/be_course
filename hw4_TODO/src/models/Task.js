module.exports = class Task {
	constructor({ id, title, isCompleted, userId }) {
		this.id = id;
		this.title = title;
		this.isCompleted = isCompleted;
		this.userId = userId;
	}
};

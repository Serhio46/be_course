const { v4: uuidv4 } = require('uuid');

const fileHelper = require('../helpers/fileHelper');
const dbHelper = require('../helpers/dbHelper');
const Task = require('../models/Task');
const ApiError = require('../exceptions/apiError');

class TodoService {
	async createTodo(title, isCompleted, userId) {
		try {
			const db = await fileHelper.readFile('db.json');
			const taskId = uuidv4();
			const newTask = new Task(taskId, title, isCompleted, userId);
			await fileHelper.writeFile('db.json', dbHelper.addNewEntry(db, newTask, 'tasks'));
			return newTask;
		} catch (e) {
			throw e;
		}
	}

	async getTodos(userId) {
		try {
			const db = await fileHelper.readFile('db.json');
			const tasks = db.tasks.filter(task => task.userId === userId);
			return tasks;
		} catch (e) {
			throw e;
		}
	}

	async updateTodoTitle(id, title, userId) {
		try {
			const db = await fileHelper.readFile('db.json');
			const task = db.tasks.find(task => task.id === id);
			//Err you don't have permissions to update this task
			if (!task) return null;

			if (task.userId !== userId) {
				throw ApiError.ForbiddenError('You do not have permission to update this task');
			}

			await fileHelper.writeFile('db.json', dbHelper.updateEntry(db, { title, id }, 'tasks'));
			return { ...task, title };
		} catch (e) {
			throw e;
		}
	}

	async updateStatus(id, userId) {
		try {
			const db = await fileHelper.readFile('db.json');
			const task = db.tasks.find(task => task.id === id);

			if (!task) return null;

			if (task.userId !== userId) {
				throw ApiError.ForbiddenError('You do not have permission to update this task');
			}

			await fileHelper.writeFile('db.json', dbHelper.updateEntry(db, { isCompleted: !task.isCompleted, id }, 'tasks'));
			return { ...task, isCompleted: !task.isCompleted };
		} catch (e) {
			throw e;
		}
	}

	async deleteTodoById(id, userId) {
		try {
			const db = await fileHelper.readFile('db.json');
			const task = db.tasks.find(task => task.id === id);

			if (!task) return null;

			if (task.userId !== userId) {
				throw ApiError.ForbiddenError('You do not have permission to delete this task');
			}

			await fileHelper.writeFile('db.json', dbHelper.deleteEntry(db, id, 'tasks'));
			return task;
		} catch (e) {
			throw e;
		}
	}
}

module.exports = new TodoService();

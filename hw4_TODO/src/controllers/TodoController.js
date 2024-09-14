const TodoService = require('../services/TodoService');

class TodoController {
	async getTodos(req, res, next) {
		try {
			const userId = req.id;
			const result = await TodoService.getTodos(userId);

			if (!result?.length) return res.status(404).json({ message: 'Todos not found' });

			res.json(result).status(200);
		} catch (e) {
			next(e);
		}
	}

	async createTodo(req, res, next) {
		try {
			const { title, isCompleted } = req.body;
			const userId = req.id;
			const result = await TodoService.createTodo(title, isCompleted, userId);
			res.json(result).status(201);
		} catch (e) {
			next(e);
		}
	}

	async updateTodoTitle(req, res, next) {
		try {
			const { id } = req.params;
			const { title } = req.body;
			const userId = req.id;
			const result = await TodoService.updateTodoTitle(id, title, userId);

			if (!result) return res.json({ message: 'Todo not found' }).status(404);

			res.json(result).status(200);
		} catch (e) {
			next(e);
		}
	}

	async updateTodoStatus(req, res, next) {
		try {
			const { id } = req.params;
			const userId = req.id;
			const result = await TodoService.updateStatus(id, userId);

			if (!result) return res.json({ message: 'Todo not found' }).status(404);

			res.json(result).status(200);
		} catch (e) {
			next(e);
		}
	}

	async deleteTodoById(req, res, next) {
		try {
			const { id } = req.params;
			const userId = req.id;
			const result = await TodoService.deleteTodoById(id, userId);

			if (!result) return res.json({ message: 'Todo not found' }).status(404);

			res.json(result).status(200);
		} catch (e) {
			next(e);
		}
	}
}

module.exports = new TodoController();

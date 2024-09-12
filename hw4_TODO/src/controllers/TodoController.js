class TodoController {
	async getTodos(req, res) {
		res.json({ message: 'Get todos' });
	}
}

module.exports = new TodoController();

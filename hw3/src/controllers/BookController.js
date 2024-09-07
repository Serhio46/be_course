const BookService = require('../services/BookService');

class BookController {
	async createBook(req, res) {
		const result = await BookService.createBook(req.body);
		res.json(result).status(201);
	}

	async getBooks(req, res) {
		const result = await BookService.getBooks();
		res.json(result).status(200);
	}

	async getBooksById(req, res) {
		const { id } = req.params;
		const result = await BookService.getBooksById(id);

		if (!result) {
			return res.status(404).json({ message: 'Book not found' });
		}

		res.json(result).status(200);
	}

	async updateBookById(req, res) {
		const { id } = req.params;
		const result = await BookService.updateBookById(id, req.body);

		if (!result) {
			return res.status(404).json({ message: 'Book not found' });
		}

		res.json(result);
	}

	async deleteBookById(req, res) {
		const { id } = req.params;
		const result = await BookService.deleteBookById(id);

		if (!result) {
			return res.status(404).json({ message: 'Book not found' });
		}

		res.json({ message: 'Book has been deleted' }).status(204);
	}
}

module.exports = new BookController();

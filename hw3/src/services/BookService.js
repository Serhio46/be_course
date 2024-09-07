const Book = require('../models/Book');
const fileHelper = require('../helpers/fileHelper');
const dbHelper = require('../helpers/dbHelper');
const { v4: uuidv4 } = require('uuid');

class BookService {
	async createBook({ title, author, genre, year }) {
		const id = uuidv4();
		const newBook = new Book(title, author, genre, year, id);
		const db = await fileHelper.readFile('db.json');
		return await fileHelper.writeFile('db.json', dbHelper.addNewEntry(db, newBook, 'books'));
	}

	async getBooks() {
		const { books } = await fileHelper.readFile('db.json');
		return books;
	}

	async getBooksById(id) {
		const { books } = await fileHelper.readFile('db.json');
		return books.find(book => book.id === id);
	}

	async updateBookById(id, body) {
		const db = await fileHelper.readFile('db.json');

		if (!db.books.find(book => book.id === id)) {
			return null;
		}

		return await fileHelper.writeFile('db.json', dbHelper.updateEntry(db, { ...body, id }, 'books'));
	}

	async deleteBookById(id) {
		const db = await fileHelper.readFile('db.json');

		if (!db.books.find(book => book.id === id)) {
			return null;
		}

		return await fileHelper.writeFile('db.json', dbHelper.deleteEntry(db, id, 'books'));
	}
}

module.exports = new BookService();

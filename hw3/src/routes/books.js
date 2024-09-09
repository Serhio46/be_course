const Router = require('express');
const router = new Router();

const BookController = require('../controllers/BookController');
const {
	createBookValidator,
	getBookByIdValidator,
	updateBookByIdValidator,
	deleteBookByIdValidator,
} = require('../helpers/validators/bookValidator');
const { validateRequestMiddleware } = require('../middlewares/validateRequestMiddleware');

router.post('/', createBookValidator, validateRequestMiddleware, BookController.createBook);
router.get('/', BookController.getBooks);
router.get('/:id', getBookByIdValidator, validateRequestMiddleware, BookController.getBooksById);
router.put('/:id', updateBookByIdValidator, validateRequestMiddleware, BookController.updateBookById);
router.delete('/:id', deleteBookByIdValidator, validateRequestMiddleware, BookController.deleteBookById);

module.exports = router;

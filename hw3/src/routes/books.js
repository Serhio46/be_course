const Router = require('express');
const router = new Router();

const BookController = require('../controllers/BookController');

router.post('/', BookController.createBook);
router.get('/', BookController.getBooks);
router.get('/:id', BookController.getBooksById);
router.put('/:id', BookController.updateBookById);
router.delete('/:id', BookController.deleteBookById);

module.exports = router;

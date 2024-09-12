const Router = require('express');
const router = new Router();

const TodoController = require('../controllers/TodoController');

router.get('/', TodoController.getTodos);

module.exports = router;

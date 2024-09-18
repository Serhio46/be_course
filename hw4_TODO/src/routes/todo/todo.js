const Router = require('express');
const router = new Router();

const TodoController = require('../../controllers/TodoController');
const { validateRequestMiddleware } = require('../../middlewares/validateRequestMiddleware');
const authenticateToken = require('../../middlewares/authenticateToken');
const {
	getTodoValidator,
	createTodoValidator,
	updateTodoTitleValidator,
	updateTodoStatusValidator,
	deleteTodoValidator,
} = require('../../helpers/validators/todosVaildator');

router.get('/', getTodoValidator, validateRequestMiddleware, authenticateToken, TodoController.getTodos);
router.post(`/`, createTodoValidator, validateRequestMiddleware, authenticateToken, TodoController.createTodo);
router.patch(
	`/:id`,
	updateTodoTitleValidator,
	validateRequestMiddleware,
	authenticateToken,
	TodoController.updateTodoTitle
);
router.patch(
	`/:id/isCompleted`,
	updateTodoStatusValidator,
	validateRequestMiddleware,
	authenticateToken,
	TodoController.updateTodoStatus
);
router.delete(`/:id`, deleteTodoValidator, validateRequestMiddleware, authenticateToken, TodoController.deleteTodoById);

module.exports = router;

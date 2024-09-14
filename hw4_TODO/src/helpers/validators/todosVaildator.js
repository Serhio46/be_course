const { body } = require('express-validator');

const { headerJWTValidator, uuidParamsValidator } = require('./index');

const titleValidator = [
	body('title')
		.trim()
		.notEmpty()
		.withMessage('Title is required')
		.isString()
		.isLength({ min: 1, max: 255 })
		.withMessage('Title must be a string with length between 1 and 255'),
];

const createTodoValidator = [
	body('isCompleted').isBoolean().withMessage('isCompleted must be a boolean'),
	...titleValidator,
	...headerJWTValidator,
];

const updateTodoTitleValidator = [...titleValidator, ...uuidParamsValidator, ...headerJWTValidator];

module.exports = {
	createTodoValidator,
	getTodoValidator: headerJWTValidator,
	updateTodoTitleValidator,
	updateTodoStatusValidator: [...uuidParamsValidator, ...headerJWTValidator],
	deleteTodoValidator: [...uuidParamsValidator, ...headerJWTValidator],
};

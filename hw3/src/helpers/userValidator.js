const { body, param, query } = require('express-validator');

const createUserValidation = [
	body('name')
		.isString()
		.isLength({ min: 3, max: 50 })
		.withMessage('Name must be a string with length between 3 and 50 characters'),
	body('email').isEmail().withMessage('Email must be a valid email address'),
	body('password')
		.isString()
		.isLength({ min: 6, max: 50 })
		.withMessage('Password length must be between 6 and 50 characters'),
];

const getUsersValidation = [
	query('limit').isInt({ min: 10, max: 100 }).optional().withMessage('Limit must be between 10 and 100 characters'),
	query('page').isInt({ min: 1 }).optional().withMessage('Page must be an integer greater than 0'),
];

const getUserByIdValidation = [param('id').isString().withMessage('Id must be an integer')];

const updateUserByIdValidation = [...getUserByIdValidation, ...createUserValidation.map(item => item.optional())];
const deleteUserByIdValidation = getUserByIdValidation;

module.exports = {
	createUserValidation,
	getUserByIdValidation,
	updateUserByIdValidation,
	deleteUserByIdValidation,
	getUsersValidation,
};

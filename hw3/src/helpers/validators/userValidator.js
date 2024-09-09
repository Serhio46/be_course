const { body, query } = require('express-validator');
const { uuidValidator } = require('./index');

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

const updateUserByIdValidation = [...uuidValidator, ...createUserValidation.map(item => item.optional())];

module.exports = {
	createUserValidation,
	getUserByIdValidation: uuidValidator,
	updateUserByIdValidation,
	deleteUserByIdValidation: uuidValidator,
	getUsersValidation,
};

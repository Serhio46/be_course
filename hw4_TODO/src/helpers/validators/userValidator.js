const { body, header } = require('express-validator');

const userValidator = [
	body('userName')
		.trim()
		.notEmpty()
		.withMessage('Username is required')
		.isString()
		.isLength({ min: 3, max: 50 })
		.withMessage('Name must have length between 3 and 50 characters'),
	body('password')
		.trim()
		.notEmpty()
		.withMessage('Password is required')
		.isString()
		.isLength({ min: 6, max: 50 })
		.withMessage('Password must have length between 6 and 50 characters'),
];

const loginUserValidation = [...userValidator, header('Authorization').notEmpty().isJWT().withMessage('Unauthorized')];

module.exports = {
	userValidator,
	loginUserValidation,
};

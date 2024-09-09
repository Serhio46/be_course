const { checkSchema } = require('express-validator');

const { uuidValidator } = require('./index');

const createBookValidatorSchema = {
	title: {
		in: ['body'],
		isString: {
			errorMessage: 'Title should be a string',
		},
		isLength: {
			errorMessage: 'Title should be at least 1 character long',
			options: { min: 1 },
		},
		notEmpty: {
			errorMessage: 'Title should not be empty',
		},
	},
	author: {
		in: ['body'],
		isString: {
			errorMessage: 'Author should be a string',
		},
		isLength: {
			errorMessage: 'Author should be at least 1 character long',
			options: { min: 1 },
		},
		notEmpty: {
			errorMessage: 'Author should not be empty',
		},
	},
	genre: {
		in: ['body'],
		isString: {
			errorMessage: 'Genre should be a string',
		},
		isLength: {
			errorMessage: 'Genre should be at least 1 character long',
			options: { min: 1 },
		},
		notEmpty: {
			errorMessage: 'Genre should not be empty',
		},
		isIn: {
			options: [['Fiction', 'Non-Fiction', 'Mystery', 'Biography', 'Fantasy']],
			errorMessage: 'Genre should be one of the following: Fiction, Non-Fiction, Mystery, Biography, Fantasy',
		},
	},
	year: {
		in: ['body'],
		isInt: {
			errorMessage: 'Year should be an integer',
		},
		isLength: {
			errorMessage: 'Year should be at least 4 characters long',
			options: { min: 4 },
		},
		notEmpty: {
			errorMessage: 'Year should not be empty',
		},
	},
};

const getBookByIdValidator = {
	id: {
		in: ['params'],
		isUUID: {
			errorMessage: 'Id should be a UUID',
		},
	},
};

const updateBookByIdValidator = {
	...getBookByIdValidator,
	...Object.entries(createBookValidatorSchema).reduce((acc, [key, value]) => {
		acc[key] = {
			...value,
			optional: true,
		};
		return acc;
	}, {}),
};

module.exports = {
	createBookValidator: checkSchema(createBookValidatorSchema),
	getBookByIdValidator: uuidValidator,
	updateBookByIdValidator: checkSchema(updateBookByIdValidator),
	deleteBookByIdValidator: uuidValidator,
};

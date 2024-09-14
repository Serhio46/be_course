const { param, header } = require('express-validator');

const uuidParamsValidator = [param('id').isUUID().withMessage('Id should be a UUID')];

const headerJWTValidator = [
	header('Authorization')
		.notEmpty()
		.withMessage('Unauthorized')
		.customSanitizer(value => value.split(' ')[1])
		.isJWT()
		.withMessage('Unauthorized5555'),
];

module.exports = {
	uuidParamsValidator,
	headerJWTValidator,
};

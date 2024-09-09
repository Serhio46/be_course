const { param } = require('express-validator');

const uuidValidator = [param('id').isUUID().withMessage('Id should be a UUID')];

module.exports = {
	uuidValidator,
};

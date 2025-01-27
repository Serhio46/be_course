const Router = require('express');
const router = new Router();

const UserController = require('../../controllers/UserController');
const { userValidator, updateUserValidator } = require('../../helpers/validators/userValidator');
const { validateRequestMiddleware } = require('../../middlewares/validateRequestMiddleware');
const { headerJWTValidator } = require('../../helpers/validators');
const authenticateToken = require('../../middlewares/authenticateToken');

router.post('/register', userValidator, validateRequestMiddleware, UserController.register);
router.post('/login', userValidator, validateRequestMiddleware, UserController.login);
router.post('/:id', updateUserValidator, validateRequestMiddleware, authenticateToken, UserController.updateUserById);
router.delete('/:id', headerJWTValidator, validateRequestMiddleware, authenticateToken, UserController.deleteUserById);

module.exports = router;

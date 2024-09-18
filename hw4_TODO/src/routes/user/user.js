const Router = require('express');
const router = new Router();

const UserController = require('../../controllers/UserController');
const { userValidator } = require('../../helpers/validators/userValidator');
const { validateRequestMiddleware } = require('../../middlewares/validateRequestMiddleware');

router.post('/register', userValidator, validateRequestMiddleware, UserController.register);
router.post('/login', userValidator, validateRequestMiddleware, UserController.login);

module.exports = router;

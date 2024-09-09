const Router = require('express');
const router = new Router();

const {
	createUserValidation,
	getUserByIdValidation,
	updateUserByIdValidation,
	deleteUserByIdValidation,
	getUsersValidation,
} = require('../helpers/userValidator');
const UserController = require('../controllers/UserController');
const { validateRequestMiddleware } = require('../middlewares/validateRequestMiddleware');

router.post('/', createUserValidation, validateRequestMiddleware, UserController.createUser);
router.get('/', getUsersValidation, validateRequestMiddleware, UserController.getUsers);
router.get('/:id', getUserByIdValidation, validateRequestMiddleware, UserController.getUserById);
router.put('/:id', updateUserByIdValidation, validateRequestMiddleware, UserController.updateUserById);
router.delete('/:id', deleteUserByIdValidation, validateRequestMiddleware, UserController.deleteUserById);

module.exports = router;

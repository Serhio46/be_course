const Router = require('express');
const router = new Router();
const UserController = require('../controllers/UserController');

router.post('/', UserController.createUser);
router.get('/', UserController.getUsers);
router.get('/:id', UserController.getUserById);
router.put('/:id', UserController.updateUserById);
router.patch('/:id', UserController.updatePasswordById);
router.delete('/:id', UserController.deleteUserById);

module.exports = router;

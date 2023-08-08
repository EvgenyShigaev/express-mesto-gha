const router = require('express').Router();
const auth = require('../middlewares/auth');
const {
  getUsers, getUser, updateUser, updateAvatar, currentUser,
} = require('../controllers/users');

const {
  validationGetUsers,
  validationUpdateUser,
  validationUpdateAvatar,

} = require('../middlewares/validation');

router.get('/', auth, getUsers);

router.get('/me', currentUser);

router.get('/:userId', validationGetUsers, getUser);

router.patch('/me', validationUpdateUser, updateUser);

router.patch('/me/avatar', validationUpdateAvatar, updateAvatar);

module.exports = router;

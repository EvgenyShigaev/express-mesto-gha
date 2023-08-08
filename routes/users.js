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

router.get('/me', auth, currentUser);

router.get('/:userId', auth, validationGetUsers, getUser);

router.patch('/me', auth, validationUpdateUser, updateUser);

router.patch('/me/avatar', auth, validationUpdateAvatar, updateAvatar);

module.exports = router;

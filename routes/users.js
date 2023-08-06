const router = require('express').Router();
const {
  getUsers, getUser, updateUser, updateAvatar, currentUser,
} = require('../controllers/users');

const {
  validationUpdateUser,
  validationUpdateAvatar,
  validationGetUsers,
} = require('../middlewares/validation');

router.get('/', getUsers);

router.get('/me', currentUser);

router.get('/:userId', validationGetUsers, getUser);

// router.post('/', createUser);
router.patch('/me', validationUpdateUser, updateUser);

router.patch('/me/avatar', validationUpdateAvatar, updateAvatar);

module.exports = router;

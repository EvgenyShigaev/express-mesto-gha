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

router.get('/:userId', getUser, validationGetUsers);

// router.post('/', createUser);
router.patch('/me', updateUser, validationUpdateUser);

router.patch('/me/avatar', updateAvatar, validationUpdateAvatar);

module.exports = router;

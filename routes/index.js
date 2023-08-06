const router = require('express').Router();
const auth = require('../middlewares/auth');
const userRoutes = require('./users');
const cardRoutes = require('./cards');
const { createUser, login } = require('../controllers/users');

const {
  validationLogin,
  validationCreateUser,
} = require('../middlewares/validation');

router.use(auth);

router.use('/signin', validationLogin, login);
router.use('/signup', validationCreateUser, createUser);

router.use('/users', userRoutes);
router.use('/cards', cardRoutes);

module.exports = router;

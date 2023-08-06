const router = require('express').Router();
const userRoutes = require('./users');
const cardRoutes = require('./cards');
const { createUser, login } = require('../controllers/users');

const {
  validationLogin,
  validationCreateUser,
} = require('../middlewares/validation');

router.use('/users', userRoutes);
router.use('/cards', cardRoutes);

router.use('/signin', validationLogin, login);
router.use('/signup', validationCreateUser, createUser);

module.exports = router;

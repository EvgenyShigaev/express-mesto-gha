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

router.use('/signin', login, validationLogin);
router.use('/signup', createUser, validationCreateUser);

module.exports = router;

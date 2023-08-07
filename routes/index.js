const router = require('express').Router();

const {
  validationLogin,
  validationCreateUser,
} = require('../middlewares/validation');

const auth = require('../middlewares/auth');
const userRoutes = require('./users');
const cardRoutes = require('./cards');
const { createUser, login } = require('../controllers/users');

const NotFoundError = require('../errors/NotFoundError');

router.use(auth);

router.post('/signin', validationLogin, login);
router.post('/signup', validationCreateUser, createUser);

router.use('/users', userRoutes);
router.use('/cards', cardRoutes);

router.use((req, res, next) => {
  next(new NotFoundError('NotFoundError'));
});

module.exports = router;

const router = require('express').Router();
const auth = require('../middlewares/auth');
const userRoutes = require('./users');
const cardRoutes = require('./cards');
// const { createUser, login } = require('../controllers/users');

// const {
//   validationLogin,
//   validationCreateUser,
// } = require('../middlewares/validation');

const errorNotFound = require('./errorNotFound');

// router.post('/signin', validationLogin, login);
// router.post('/signup', validationCreateUser, createUser);
router.use(auth);

router.use('/users', userRoutes, errorNotFound);
router.use('/cards', cardRoutes, errorNotFound);

// router.use((req, res, next) => {
//   next(new NotFoundError('NotFoundError'));
// });

module.exports = router;

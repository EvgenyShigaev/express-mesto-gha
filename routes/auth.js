const router = require('express').Router();

const { createUser, login } = require('../controllers/users');

const {
  validationLogin,
  validationCreateUser,
} = require('../middlewares/validation');

router.post('/signin', validationLogin, login);
router.post('/signup', validationCreateUser, createUser);

module.exports = router;

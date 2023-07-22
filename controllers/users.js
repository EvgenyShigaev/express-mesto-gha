const User = require('../models/user');

const ERROR_CODE = 400;
const NOT_FOUND = 404;
const INTERNAL_SERVER_ERROR = 500;

const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).send(users);
  } catch (err) {
    res
      .status(INTERNAL_SERVER_ERROR)
      .send({
        message: 'Server error',
      });
  }
};

const getUser = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        res.status(404).send({ message: 'User not found' });
      } else {
        res.status(200).send(user);
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Запрашиваемые данные не найдены' });
      } else {
        res.status(500).send({ message: 'Server error' });
      }
    });
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.status(201).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res
          .status(ERROR_CODE)
          .send({
            message: 'Запрашиваемые данные не найдены',
          });
      } else {
        res
          .status(INTERNAL_SERVER_ERROR)
          .send({
            message: 'Server error',
          });
      }
    });
};

const updateAvatar = (req, res) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((user) => res.status(200).send({ data: user }))
    .catch((err) => {
      if (err.message === 'Not found') {
        res
          .status(NOT_FOUND)
          .send({
            message: 'User not found',
          });
      } else if (err.message === 'Запрашиваемые данные не найдены') {
        res
          .status(ERROR_CODE)
          .send({
            message: 'Запрашиваемые данные не найдены',
          });
      } else {
        res
          .status(INTERNAL_SERVER_ERROR)
          .send({
            message: 'Server error',
          });
      }
    });
};

const updateUser = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true },
  )
    .orFail()
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'Not found') {
        res.status(404).send({
          message: 'User not found',
        });
      } else if (err.name === 'ValidationError') {
        res.status(400).send({
          message: 'Запрашиваемые данные не найдены',
        });
      } else {
        res.status(500).send({
          message: 'Server error',
        });
      }
    });
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  updateAvatar,
};

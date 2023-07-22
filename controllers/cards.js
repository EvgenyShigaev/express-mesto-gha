const Card = require('../models/card');

const ERROR_CODE = 400;
const NOT_FOUND = 404;
const INTERNAL_SERVER_ERROR = 500;

const getCards = (req, res) => {
  // eslint-disable-next-line no-console
  console.log('req.user._id', req.user._id);
  Card.find({})
    .then((cards) => res.status(200).send(cards))
    .catch(() => res.status(INTERNAL_SERVER_ERROR).send({
      message: 'Server error',
    }));
};

const createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => res.status(201).send(card))
    .catch((err) => {
      if (err.message.includes('ValidationError')) {
        res.status(ERROR_CODE).send({ message: 'Запрашиваемые данные не найдены' });
      } else {
        res
          .status(INTERNAL_SERVER_ERROR)
          .send({
            message: 'Server error',
          });
      }
    });
};

const deleteCard = async (req, res) => {
  try {
    const card = await Card.findByIdAndDelete(
      req.params.cardId,
    )
      .orFail(() => new Error('Not found'));
    res.status(200).send(card);
  } catch (err) {
    if (err.message === 'Not found') {
      res
        .status(NOT_FOUND)
        .send({
          message: 'Card not found',
        });
    } else if (err.name === 'CastError') {
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
  }
};

const likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => new Error('Not found'))
    .then((card) => {
      res.status(200).send(card);
    })
    .catch((err) => {
      if (err.message === 'Not found') {
        res.status(NOT_FOUND).send({
          message: 'Card not found',
        });
      } else if (err.name === 'CastError') {
        res.status(ERROR_CODE).send({
          message: 'Запрашиваемые данные не найдены',
        });
      } else {
        res.status(INTERNAL_SERVER_ERROR).send({
          message: 'Server error',
        });
      }
    });
};

const dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => new Error('Not found'))
    .then((card) => {
      res.status(200).send(card);
    })
    .catch((err) => {
      if (err.message === 'Not found') {
        res
          .status(NOT_FOUND)
          .send({
            message: 'Card not found',
          });
      } else if (err.name === 'CastError') {
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

module.exports = {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
};

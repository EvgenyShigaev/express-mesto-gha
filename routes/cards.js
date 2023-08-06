const router = require('express').Router();
const {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');

const {
  validationCardId,
  validationCreateCard,
} = require('../middlewares/validation');

router.get('/', getCards);
router.post('/', createCard, validationCreateCard);
router.delete('/:cardId', deleteCard, validationCardId);

router.put('/:cardId/likes', likeCard, validationCardId);
router.delete('/:cardId/likes', dislikeCard, validationCardId);

module.exports = router;

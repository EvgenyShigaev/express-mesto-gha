const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const { errors } = require('celebrate');
const router = require('./routes');
const internalServerError = require('./middlewares/internalServerError');
const limiter = require('./middlewares/rateLimit');

const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useNewUrlParser: true,
});

const app = express();

app.use(helmet());
app.use(limiter);

app.use(express.json());
app.use(errors());
app.use(router);
app.use(internalServerError);

// middleware для обработки ошибок
app.use((req, res, next) => {
  const error = new Error('Page not found');
  res.status(404).send({ message: 'Страница не найдена' });
  next(error);
});

app.use((error, req, res) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Подключен к порту 3000 ${PORT}`);
});

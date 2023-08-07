const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const { errors } = require('celebrate');
const router = require('./routes');

const limiter = require('./middlewares/rateLimit');
const internalServerError = require('./middlewares/internalServerError');

const { PORT = 3000 } = process.env;

const app = express();

app.use(express.json());
app.use(router);
app.use(errors());
app.use(internalServerError);

app.use(helmet());
app.use(limiter);

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useNewUrlParser: true,
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Подключен к порту 3000 ${PORT}`);
});

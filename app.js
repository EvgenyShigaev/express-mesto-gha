const express = require('express');
const mongoose = require('mongoose');
// const helmet = require('helmet');
const { errors } = require('celebrate');
const router = require('./routes');

// const auth = require('./middlewares/auth');
// const limiter = require('./middlewares/rateLimit');
const internalServerError = require('./middlewares/error500');

const { PORT = 3000 } = process.env;
mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useNewUrlParser: true,
});
const app = express();

app.use(express.json());
// router.use(auth);
app.use(router);

app.use(errors());
app.use(internalServerError);

// app.use(helmet());
// app.use(limiter);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Подключен к порту 3000 ${PORT}`);
});

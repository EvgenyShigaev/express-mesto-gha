const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes');

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useNewUrlParser: true,
});

app.use(express.json());

app.use((req, res, next) => {
  req.user = {
    _id: '64bc2f5238884218d7141e8c',
  };

  next();
});

app.use(router);

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

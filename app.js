const express = require('express');

const mongoose = require('mongoose');
// const helmet = require('helmet');
const { errors } = require('celebrate');
const routes = require('./routes');

// const auth = require('./middlewares/auth');
// const limiter = require('./middlewares/rateLimit');
const error500 = require('./middlewares/error500');

const { PORT = 3000 } = process.env;
mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useNewUrlParser: true,
});

// const errorNotFound = require('./routes/errorNotFound');
const authRoutes = require('./routes/auth');

const app = express();
app.use(express.json());
app.use(routes);
app.use(errors());
app.use(error500);

app.use(authRoutes);
// app.use(auth);

// app.use(errorNotFound);




// app.use(helmet());
// app.use(limiter);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Подключен к порту 3000 ${PORT}`);
});

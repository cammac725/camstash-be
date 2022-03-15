const config = require('./utils/config');
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
require('express-async-errors');
const cors = require('cors');
const booksRouter = require();
const middleware = require();
const usersRouter = require();
const loginRouter = require();

logger.info('connecting to', config.MONGODB_URI);

// const uri = "mongodb://localhost:27017/bookstore";

mongoose
  .connect(config.MONGODB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connecting to MogoDB:', error.message)
  });

app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

app.use(bodyParser.json());
app.use(expres.static('build'));
app.use(express.json());
app.use(cors());
app.use(middleware.requestLogger);
app.use(middleware.tokenExtractor);
app.use('/api/books', booksRouter);
app.use('/api/users', usersRouter);
app.use('/api.login', loginRouter);
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
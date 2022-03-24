const config = require('./utils/config');
const express = require("express");
const bodyParser = require("body-parser");
const logger = require('./utils/logger');
const mongoose = require("mongoose");
const app = express();
require('express-async-errors');
const cors = require('cors');
const booksRouter = require('./controllers/books');
const middleware = require('./utils/middleware');

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
    logger.error('error connecting to MongoDB:', error.message)
  });

app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

app.use(bodyParser.json());
app.use(express.static('build'));
app.use(express.json());
app.use(cors());
app.use('/api/books', booksRouter);
app.use(middleware.requestLogger);
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
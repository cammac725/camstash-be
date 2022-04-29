const config = require('./utils/config')
const express = require("express")
const bodyParser = require("body-parser")
const configMiddleware = require('../config/middleware')
const mongoose = require("mongoose")
const server = express()
const cors = require('cors')
const authRouter = require('../auth/auth-router')
const loginRouter = require('./controllers/login')
const usersRouter = require('../users/users-router')
const booksRouter = require('../books/books-router')

// logger.info('connecting to', config.MONGODB_URI)

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
  })

server.use(
  bodyParser.urlencoded({
    extended: false
  })
)

configMiddleware(server);

server.use(bodyParser.json())
server.use("/api/auth", authRouter);
server.use("/api/users", usersRouter);
server.use("/api/books", booksRouter);
server.use("/api/login", loginRouter);

server.get('/', async (req, res) => {
  res.status(200).json({ api: 'running' })
})

module.exports = server;
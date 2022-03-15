const booksRouter = require('express').Router();
const Book = require('../models/book');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

booksRouter.get('/', async (req, res, next) => {
  try {
    const books = await Book.find({}).populate('user', {
      username: 1
    })

    if (books) {
      res.json(books.map((allBooks) => allBooks.toJSON()))
    } else {
      res.status(404).end()
    }
  } catch (exception) {
    next(exception)
  }
});

booksRouter.get('/:id', async (req, res, next) => {
  try {
    const books = await Book.findById(req.params.id)

    if (books) {
      res.json(books.toJSON())
    } else {
      res.status(404).end()
    }
  } catch (exception) {
      next(exception)
  }
});

booksRouter.post('/', async (req, res, next) => {
  const body = req.body;
  const decodedToken = jwt.verify(req.token, process.env.SECRET)

  if (!req.token || !decodedToken.id || req.token === null) {
    return res.status(401).json({ error: 'token missing or invalid' })
  }

  const user = await User.findById(decodedToken.id);
  const book = new Book({
    title: body.title,
    author: body.author,
    genre: body.genre,
    published: body.published,
    dateread: body.read,
    user: user._id,
  });

  try {
    if (
      body.title !== undefined &&
      body.author !== undefined &&
      body.genre !== undefined &&
      body.published !== undefined &&
      body.dateread !== undefined
      ) {
        const savedBook = await book.save();
        user.books - user.books.concat(savedBook._id)
        await user.save()
        res.json(savedBook.toJSON)
      } else {
        res.status(400).send('Bad request. Information missing.')
      }
  } catch (exception) {
    next(exception)
  }
});

booksRouter.delete('/:id', async (req, res, next) => {
  const decodedToken = jwt.verify(req.token, process.env.SECRET);

  if (!req.token || !decodedToken.id) {
    return res.status(401).json({ error: 'token missing or invalid' })
  }

  const user = await User.findById(decodedToken.id);
  const book = await Book.findById(req.params.id);

  if (user._id.toString() !== book.user.toString()) {
    return res.status(400).json({ error: 'invalid user' })
  }

  try {
    await Book.findByIdAndRemove(req.params.id)
    res.status(204).end()
  } catch (exception) {
      next(exception)
  }
});

booksRouter.put('/:id', async (req, res, next) => {
  const body = req.body;
  const book = {
    title: body.title,
    author: body.author,
    genre: body.genre,
    published: body.published,
    dateread: body.dateread,
  }

  try {
    const books = await Book.findByIdAndUpdate(req.params.id, book, {
      new: true,
    });
    res.json(books.toJSON)
  } catch (exception) {
      console.log('exception', exception)
      next(exception)
  }
});

module.exports = booksRouter;

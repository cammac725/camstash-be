const booksRouter = require('express').Router();
const Book = require('../models/book');

booksRouter.get('/', async (req, res, next) => {
  try {
    const books = await Book.find({})
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
  // const books = await Book.find({})

  const book = new Book({
    title: body.title,
    author: body.author,
    genre: body.genre,
    published: body.published,
    dateread: body.dateread,
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
        // books = books.concat(savedBook._id)
        res.json(savedBook.toJSON)
      } else {
        res.status(400).send('Bad request. Information missing.')
      }
  } catch (exception) {
    next(exception)
  }
});

booksRouter.delete('/:id', async (req, res, next) => {
  const book = await Book.findById(req.params.id);

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

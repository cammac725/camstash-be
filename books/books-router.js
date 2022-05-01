const router = require('express').Router()
const Books= require('./books-model')

router.get("/", async (req, res) => {
  try {
    const books = await Books.getAllBooks()
    res.status(200).json(books)
  } catch (error) {
    res.status(500).json({
      message: 'We ran into an error getting the books'
    })
  }
})

router.get("/:id", async (req, res) => {
  try {
    const book = await Books.getBookById(req.params.id);

    if (book) {
      res.status(200).json(book);
    } else {
      res.status(500).json({
        message: 'We cannot find the book you requested'
      })
    }
  } catch (error) {
    res.status(500).json({
      message: 'The server ran into an error getting the books'
    })
  }
})

router.post("/", async (req, res) => {
  const book = req.body;
  
  if (book.title) {
    try {
      const addedBook = await Books.addBook(book)
      res.status(201).json(addedBook)
    } catch (error) {
      res.status(500).json({
        message: 'Could not add the book'
      })
    }
  } else {
    res.status(400).json({
      message: 'Please provide the title of the book'
    })
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const count = await Books.removeBook(req.params.id)
    if (count > 0) {
      res.status(204).end();
    } else {
      res.status(404).json({
        message: 'That book does not exist, maybe it was deleted already'
      })
    }
  } catch (error) {
    res.status(500).json({
      message: 'We ran into an error removing the recipe'
    })
  }
});

router.put("/:id", async (req, res) => {
  const changes = req.body
  if (changes.name) {
    try {
      const updated = await Books.updateBook(req.params.id, changes)
      if (updated) {
        res.status(200).json(updated)
      } else {
        res.status(404).json({
          message: 'That book does not exist'
        })
      }
    } catch (error) {
      res.status(500).json({
        message: 'We ran into an error updating the book'
      })  
    }
  } else {
    res.status(400).json({
      message: 'Please provide the title of the book'
    })
  }
});

module.exports = router

const db = require('../utils/config')

module.exports = {
  getAllBooks,
  getBookById,
  addBook,
  removeBook,
  updateBook
}

function getAllBooks() {
  return ('books')
    .select(
      'books.id',
      'books.title',
      'books.author',
      'books.genre',
      'books.published',
      'books.dateread'
    )
}

function getBookById(id) {
  return db("books")
    .where({ "books.id": id })
    .first()
    .select(
      'books.id',
      'books.title',
      'books.author',
      'books.genre',
      'books.published',
      'books.dateread'
    )
}

async function addBook(book) {
  const [id] = await db('books').insert(book, 'id')
  return db('books')
    .where({ id })
    .first()
}

function removeBook(id) {
  return db('books')
    .where({ id })
    .del()
}

function updateBook(id, changes) {
  return db('books')
    .where({ id })
    .update(changes)
}
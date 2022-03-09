const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookSchema = new Schema({
  bookname: String,
  author: String,
  genre: String,
  published: Number,
  dateread: Number,
});

const bookModel = mongoose.model("book", bookSchema, "book");

module.exports = bookModel;
const mongoose = require('mongoose');

// mongoose.set('useFindAndModify', false);

const bookSchema = new mongoose.Schema({
  // id: Number,
  title: { type: String, required: true },
  author: { type: String, required: true },
  genre: {type: String, required: true },
  published: {type: Number, required: true},
  dateread: {type: Number, required: true},
});

bookSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book
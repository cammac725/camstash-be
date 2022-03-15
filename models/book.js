const mongoose = require('mongoose');

mongoose.set('useFindAndModify', false);

const Schema = new mongoose.Schema();

const bookSchema = Schema({
  id: Number,
  title: { type: String, required: true },
  author: { type: String, required: true },
  genre: {type: String, required: true },
  published: Number,
  dateread: Number,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

bookSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
});

module.exports = mongoose.model('Book', bookSchema);
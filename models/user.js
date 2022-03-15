const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = new mongoose.Schema();

const userSchema = new Schema({
  username: {
    type: String,
    minLength: 3,
    required: true,
    unique: true,
  },
  email: { type: String, requred: true },
  passwordHash: { type: String, minLength: 3, required: true },
  books: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Book',
    },
  ],
});

userSchema.plugin(uniqueValidator);

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwordHash
  }
});

const User = mongoose.model('User', userSchema)

module.exports = User;
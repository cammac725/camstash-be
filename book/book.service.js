const addBook = (Book) => (bookname, author, genre, published, dateread) => {
  if (!title || author || genre || published || dateread)
    throw new Error(
      "Missing data. Please fill in all fields."
    );
  const book = new Book({ bookname, author, genre, published, dateread });
  return book.save();
};

const listBooks = (Book) => () => {
  return Book.find({});
};

module.exports = (Book) => {
  return {
    addBook: addBook(Book),
    listBooks: listBooks(Book),
  };
};
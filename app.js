const express = require("express"),
  path = require("path"),
  bodyParser = require("body-parser"),
  mongoose = require("mongoose"),
  app = express();

const BookService = require("./book");

const port = process.env.PORT || 3000;

mongoose.Promise= global.Promise;

const uri = "mongodb://localhost:27017/bookstore";
mongoose.connect(uri, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
}),

app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

app.use(bodyParser.json());

app.use(express.static(path.resolve(__dirname, "public")));

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/listBooks", async function (req, res, next) {
  try {
    const books = await BookService.listBooks();
    res.json(books);
  } catch (error) {
    next(error)
  }
});

app.get("/addBook", async function (req, res, next) {
  const bookname = req.query.bookname;
  const author = req.query.author;
  const genre = req.query.genre;
  const published = req.query.published;
  const dateread = req.query. dateread;

  try {
    const books = await BookService.addBook(bookname, author, genre, published, dateread);
    res.json(books);
  } catch (error) {
    next(error);
  }
});

const server = app.listen(port, function() {
  console.log("The server is running on http://localhost:" + port);
});
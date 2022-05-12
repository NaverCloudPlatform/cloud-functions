const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
});

const Book = mongoose.model('book', bookSchema);

function saveBookInfo(params) {
  const book = new Book({
    title: params.bookTitle,
    author: params.bookAuthor,
  });

  return new Promise((resolve, reject) => {
    mongoose
      .connect(params.mongoUrl)
      .then(() => {
        // console.log('successfully mongodb connected'); // check mongodb connection
        book.save();
        resolve({ done: true });
      })
      .catch((error) => {
        reject({
          done: false,
          errorMessage: error,
        });
      });
  });
}

exports.main = saveBookInfo;

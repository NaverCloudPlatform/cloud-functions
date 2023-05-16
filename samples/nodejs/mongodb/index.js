const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
});

const Book = mongoose.model('book', bookSchema);

/**
 * Action to store data(e.g. title/author of a book) in Cloud DB for MongoDB
 *
 * Input parameters that must be defined as action parameters
 * @params {string} mongoUrl: the host IP of the MongoDB server that the action will access
 * @params {string} bookTitle
 * @params {string} bookAuthor
 */
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

const db = require('../db/queries');

const getIndividualBook = async (req, res, next) => {
  const bookId = parseInt(req.params.id);

  const book = await db.getIndividualBook(bookId);

  // if (!book) {
  //   return next(); //custom error function goes here
  // }

  res.render('individualBook', { title: book.bookTitle, book: book[0] });
};

module.exports = {
  getIndividualBook,
};

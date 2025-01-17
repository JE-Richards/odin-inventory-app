const db = require('../db/queries');
const asyncHandler = require('express-async-handler');
const CustomNotFoundError = require('../errors/CustomNotFoundError');

const getIndividualBook = asyncHandler(async (req, res, next) => {
  const bookId = parseInt(req.params.id);

  const book = await db.getIndividualBook(bookId);

  if (!book) {
    throw new CustomNotFoundError('Book not found');
  }

  res.render('individualBook', { title: book.bookTitle, book: book });
});

module.exports = {
  getIndividualBook,
};

const db = require('../db/queries');
const asyncHandler = require('express-async-handler');
const CustomNotFoundError = require('../errors/CustomNotFoundError');
const validateNewBook = require('../validators/newBookValidator');
const { validationResult } = require('express-validator');

const getIndividualBook = asyncHandler(async (req, res, next) => {
  const bookId = parseInt(req.params.id);

  const book = await db.getIndividualBook(bookId);

  if (!book) {
    throw new CustomNotFoundError('Book not found');
  }

  res.render('individualBook', { title: book.bookTitle, book: book });
});

const getNewBookForm = (req, res) => {
  res.render('createNewBook', {
    title: 'Add new book',
    errors: [],
    formData: {},
  });
};

const postNewBook = [
  validateNewBook,
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render('createNewBook', {
        title: 'Add new book',
        errors: errors.array(),
        formData: req.body,
      });
    }
    const newBookId = await db.insertNewBook(req.body);

    res.redirect(`${newBookId}`);
  }),
];

module.exports = {
  getIndividualBook,
  getNewBookForm,
  postNewBook,
};

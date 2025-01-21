const db = require('../db/queries');
const asyncHandler = require('express-async-handler');
const CustomNotFoundError = require('../errors/CustomNotFoundError');
const validateBook = require('../validators/bookValidator');
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
  validateBook,
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

const deleteBook = asyncHandler(async (req, res, next) => {
  const bookId = req.params.id;

  await db.deleteBook(bookId);

  res.redirect('/');
});

const getEditBookForm = asyncHandler(async (req, res, next) => {
  const bookId = req.params.id;
  const bookData = await db.getIndividualBook(bookId);

  res.render('editBook', {
    title: 'Edit book',
    errors: [],
    bookId: bookId,
    bookData: bookData,
  });
});

const postEditBook = asyncHandler(async (req, res, next) => {
  // validate form first
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).render('editBook', {
      title: 'Edit book',
      errors: errors.array(),
      formData: req.body,
    });
  }

  const bookId = req.params.id;
  const bookData = req.body;

  await db.editBook(bookId, bookData);

  res.redirect(`/books/${bookId}`);
});

module.exports = {
  getIndividualBook,
  getNewBookForm,
  postNewBook,
  deleteBook,
  getEditBookForm,
  postEditBook,
};

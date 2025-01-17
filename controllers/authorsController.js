const db = require('../db/queries');
const asyncHandler = require('express-async-handler');
const CustomNotFoundError = require('../errors/CustomNotFoundError');

const getAuthors = async (req, res) => {
  const authors = await db.getAllAuthors();

  res.render('authors', { title: 'Authors', authors: authors });
};

const getIndividualAuthor = asyncHandler(async (req, res, next) => {
  const authorId = parseInt(req.params.id);
  const author = await db.getIndividualAuthor(authorId);

  if (!author) {
    throw new CustomNotFoundError('Author not found');
  }

  const booksByAuthor = await db.getBooksByAuthor(authorId);

  res.render('individualAuthor', {
    title: author.authorName,
    author: author,
    books: booksByAuthor,
  });
});

module.exports = {
  getAuthors,
  getIndividualAuthor,
};

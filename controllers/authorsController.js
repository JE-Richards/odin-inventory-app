const db = require('../db/queries');

const getAuthors = async (req, res) => {
  const authors = await db.getAllAuthors();

  res.render('authors', { title: 'Authors', authors: authors });
};

const getIndividualAuthor = async (req, res) => {
  const authorId = parseInt(req.params.id);
  const author = await db.getIndividualAuthor(authorId);
  const authorName = author[0].authorName;
  const booksByAuthor = await db.getBooksByAuthor(authorId);

  res.render('individualAuthor', {
    title: authorName,
    author: author[0],
    books: booksByAuthor,
  });
};

module.exports = {
  getAuthors,
  getIndividualAuthor,
};

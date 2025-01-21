const db = require('../db/queries/queries');
const asyncHandler = require('express-async-handler');
const CustomNotFoundError = require('../errors/CustomNotFoundError');

const getGenres = async (req, res) => {
  const genres = await db.getAllGenres();

  res.render('genres', { title: 'Genres', genres: genres });
};

const getIndividualGenre = asyncHandler(async (req, res, next) => {
  const genreId = parseInt(req.params.id);
  const genre = await db.getIndividualGenre(genreId);

  if (!genre) {
    throw new CustomNotFoundError('Genre not found');
  }

  const booksByGenre = await db.getBooksByGenre(genreId);

  res.render('individualGenre', {
    title: genre.genreName,
    books: booksByGenre,
  });
});

module.exports = {
  getGenres,
  getIndividualGenre,
};

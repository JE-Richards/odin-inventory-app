const db = require('../db/queries');

const getGenres = async (req, res) => {
  const genres = await db.getAllGenres();

  res.render('genres', { title: 'Genres', genres: genres });
};

const getIndividualGenre = async (req, res) => {
  const genreId = parseInt(req.params.id);
  const genre = await db.getIndividualGenre(genreId);
  const genreName = genre[0].genreName;
  const booksByGenre = await db.getBooksByGenre(genreId);

  res.render('individualGenre', { title: genreName, books: booksByGenre });
};

module.exports = {
  getGenres,
  getIndividualGenre,
};

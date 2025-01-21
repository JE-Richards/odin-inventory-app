const db = require('../db/queries/queries');

const getIndex = async (req, res) => {
  const books = await db.getAllBooks();

  res.render('index', { title: 'Index', books: books });
};

module.exports = {
  getIndex,
};

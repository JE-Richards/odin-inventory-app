const { Router } = require('express');
const booksController = require('../controllers/booksController');

const individualBookRouter = () => {
  const router = Router();

  router.get('/new', (req, res) => booksController.getNewBookForm(req, res));
  router.post('/new', booksController.postNewBook);
  router.get('/:id', (req, res, next) =>
    booksController.getIndividualBook(req, res, next)
  );

  return router;
};

module.exports = individualBookRouter;

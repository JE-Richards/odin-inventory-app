const { Router } = require('express');
const booksController = require('../controllers/booksController');

const individualBookRouter = () => {
  const router = Router();

  router.get('/new', (req, res) => booksController.getNewBookForm(req, res));
  router.post('/new', booksController.postNewBook);
  router.post('/:id/delete', (req, res, next) =>
    booksController.deleteBook(req, res, next)
  );
  router.get('/:id/edit', (req, res, next) => {
    booksController.getEditBookForm(req, res, next);
  });
  router.post('/:id/edit', (req, res, next) => {
    booksController.postEditBook(req, res, next);
  });
  router.get('/:id', (req, res, next) =>
    booksController.getIndividualBook(req, res, next)
  );

  return router;
};

module.exports = individualBookRouter;

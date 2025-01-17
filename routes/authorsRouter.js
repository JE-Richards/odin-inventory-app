const { Router } = require('express');
const authorsController = require('../controllers/authorsController');

const authorsRouter = () => {
  const router = Router();

  router.get('/:id', (req, res, next) =>
    authorsController.getIndividualAuthor(req, res, next)
  );
  router.get('/', (req, res) => authorsController.getAuthors(req, res));

  return router;
};

module.exports = authorsRouter;

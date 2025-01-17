const { Router } = require('express');
const authorsController = require('../controllers/authorsController');

const authorsRouter = () => {
  const router = Router();

  router.get('/:id', (req, res) =>
    authorsController.getIndividualAuthor(req, res)
  );
  router.get('/', (req, res) => authorsController.getAuthors(req, res));

  return router;
};

module.exports = authorsRouter;

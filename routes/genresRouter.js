const { Router } = require('express');
const genresController = require('../controllers/genresController');

const genresRouter = () => {
  const router = Router();

  router.get('/:id', (req, res, next) =>
    genresController.getIndividualGenre(req, res, next)
  );
  router.get('/', (req, res) => genresController.getGenres(req, res));

  return router;
};

module.exports = genresRouter;

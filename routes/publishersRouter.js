const { Router } = require('express');
const publisherController = require('../controllers/publisherController');

const publishersRouter = () => {
  const router = Router();

  router.get('/:id', (req, res, next) =>
    publisherController.getIndividualPublisher(req, res, next)
  );
  router.get('/', (req, res) => publisherController.getPublishers(req, res));

  return router;
};

module.exports = publishersRouter;

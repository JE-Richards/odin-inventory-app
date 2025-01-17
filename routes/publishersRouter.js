const { Router } = require('express');
const publisherController = require('../controllers/publisherController');

const publishersRouter = () => {
  const router = Router();

  router.get('/:id', (req, res) =>
    publisherController.getIndividualPublisher(req, res)
  );
  router.get('/', (req, res) => publisherController.getPublishers(req, res));

  return router;
};

module.exports = publishersRouter;

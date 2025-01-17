const { Router } = require('express');
const indexController = require('../controllers/indexController');

const indexRouter = () => {
  const router = Router();

  router.get('/', (req, res) => indexController.getIndex(req, res));

  return router;
};

module.exports = indexRouter;

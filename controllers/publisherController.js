const db = require('../db/queries/queries');
const asyncHandler = require('express-async-handler');
const CustomNotFoundError = require('../errors/CustomNotFoundError');

const getPublishers = async (req, res) => {
  const publishers = await db.getAllPublishers();

  res.render('publishers', { title: 'Publishers', publishers: publishers });
};

const getIndividualPublisher = asyncHandler(async (req, res, next) => {
  const publisherId = parseInt(req.params.id);
  const publisher = await db.getIndividualPublisher(publisherId);

  if (!publisher) {
    throw new CustomNotFoundError('Publisher not found');
  }

  const booksByPublisher = await db.getBooksByPublisher(publisherId);

  res.render('individualPublisher', {
    title: publisher.publisherName,
    books: booksByPublisher,
  });
});

module.exports = {
  getPublishers,
  getIndividualPublisher,
};

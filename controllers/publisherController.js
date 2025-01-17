const db = require('../db/queries');

const getPublishers = async (req, res) => {
  const publishers = await db.getAllPublishers();

  res.render('publishers', { title: 'Publishers', publishers: publishers });
};

const getIndividualPublisher = async (req, res) => {
  const publisherId = parseInt(req.params.id);
  const publisher = await db.getIndividualPublisher(publisherId);
  const publisherName = publisher[0].publisherName;
  const booksByPublisher = await db.getBooksByPublisher(publisherId);

  res.render('individualPublisher', {
    title: publisherName,
    books: booksByPublisher,
  });
};

module.exports = {
  getPublishers,
  getIndividualPublisher,
};

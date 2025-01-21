const authorQueries = require('./authorQueries');
const bookQueries = require('./bookQueries');
const genreQueries = require('./genreQueries');
const publisherQueries = require('./publisherQueries');
const bookOperations = require('./bookOperations');

module.exports = {
  ...authorQueries,
  ...bookQueries,
  ...genreQueries,
  ...publisherQueries,
  ...bookOperations,
};

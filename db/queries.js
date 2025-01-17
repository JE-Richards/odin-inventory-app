const pool = require('./pool');

async function getAllGenres() {
  const SQL = `SELECT id, genre from genres`;
  const { rows } = await pool.query(SQL);
  return rows;
}

async function getAllPublishers() {
  const SQL = `SELECT id, publisher from publishers`;
  const { rows } = await pool.query(SQL);
  return rows;
}

async function getAllAuthors() {
  const SQL = `SELECT id, first_name, last_name FROM authors`;
  const { rows } = await pool.query(SQL);
  return rows;
}

async function getAllBooks() {
  const SQL = `
    SELECT
      books.id AS "bookId",
      books.title AS "bookTitle",
      CONCAT(authors.first_name, ' ', authors.last_name) AS "bookAuthor",
      genres.genre AS "bookGenre",
      books.cover_img_url AS "bookImg",
      publishers.publisher AS "bookPublisher"
    FROM
      books as books
      LEFT JOIN authors AS authors ON books.author_id = authors.id
      LEFT JOIN genres AS genres ON books.genre_id = genres.id
      LEFT JOIN publishers AS publishers ON books.publisher_id = publishers.id
  `;

  const { rows } = await pool.query(SQL);
  return rows;
}

async function getIndividualBook(id) {
  const SQL = `
    SELECT
      books.id AS "bookId",
      books.title AS "bookTitle",
      CONCAT(authors.first_name, ' ', authors.last_name) AS "bookAuthor",
      genres.genre AS "bookGenre",
      books.cover_img_url AS "bookImg",
      publishers.publisher AS "bookPublisher"
    FROM
      books as books
      LEFT JOIN authors AS authors ON books.author_id = authors.id
      LEFT JOIN genres AS genres ON books.genre_id = genres.id
      LEFT JOIN publishers AS publishers ON books.publisher_id = publishers.id
    WHERE
      books.id = ($1)
  `;

  const { rows } = await pool.query(SQL, [id]);
  return rows;
}

async function getIndividualAuthor(id) {
  const SQL = `
    SELECT
      id AS "authorId",
      CONCAT(first_name, ' ', last_name) as "authorName",
      bio as "authorBio"
    FROM
      authors
    WHERE
      id = ($1)
  `;

  const { rows } = await pool.query(SQL, [id]);
  return rows;
}

async function getBooksByAuthor(authorId) {
  const SQL = `
    SELECT
      books.id AS "bookId",
      books.title AS "bookTitle",
      CONCAT(authors.first_name, ' ', authors.last_name) AS "bookAuthor",
      genres.genre AS "bookGenre",
      books.cover_img_url AS "bookImg",
      publishers.publisher AS "bookPublisher"
    FROM
      books as books
      LEFT JOIN authors AS authors ON books.author_id = authors.id
      LEFT JOIN genres AS genres ON books.genre_id = genres.id
      LEFT JOIN publishers AS publishers ON books.publisher_id = publishers.id
    WHERE
      books.author_id = ($1)
  `;

  const { rows } = await pool.query(SQL, [authorId]);
  return rows;
}

async function getIndividualGenre(id) {
  const SQL = `
    SELECT
      id AS "genreId",
      genre as "genreName"
    FROM
      genres
    WHERE
      id = ($1)
  `;

  const { rows } = await pool.query(SQL, [id]);
  return rows;
}

async function getBooksByGenre(genreId) {
  const SQL = `
    SELECT
      books.id AS "bookId",
      books.title AS "bookTitle",
      CONCAT(authors.first_name, ' ', authors.last_name) AS "bookAuthor",
      genres.genre AS "bookGenre",
      books.cover_img_url AS "bookImg",
      publishers.publisher AS "bookPublisher"
    FROM
      books as books
      LEFT JOIN authors AS authors ON books.author_id = authors.id
      LEFT JOIN genres AS genres ON books.genre_id = genres.id
      LEFT JOIN publishers AS publishers ON books.publisher_id = publishers.id
    WHERE
      books.genre_id = ($1)
  `;

  const { rows } = await pool.query(SQL, [genreId]);
  return rows;
}

async function getIndividualPublisher(id) {
  const SQL = `
    SELECT
      id AS "publisherId",
      publisher as "publisherName"
    FROM
      publishers
    WHERE
      id = ($1)
  `;

  const { rows } = await pool.query(SQL, [id]);
  return rows;
}

async function getBooksByPublisher(publisherId) {
  const SQL = `
    SELECT
      books.id AS "bookId",
      books.title AS "bookTitle",
      CONCAT(authors.first_name, ' ', authors.last_name) AS "bookAuthor",
      genres.genre AS "bookGenre",
      books.cover_img_url AS "bookImg",
      publishers.publisher AS "bookPublisher"
    FROM
      books as books
      LEFT JOIN authors AS authors ON books.author_id = authors.id
      LEFT JOIN genres AS genres ON books.genre_id = genres.id
      LEFT JOIN publishers AS publishers ON books.publisher_id = publishers.id
    WHERE
      books.publisher_id = ($1)
  `;

  const { rows } = await pool.query(SQL, [publisherId]);
  return rows;
}

module.exports = {
  getAllAuthors,
  getAllGenres,
  getAllPublishers,
  getAllBooks,
  getIndividualBook,
  getIndividualAuthor,
  getBooksByAuthor,
  getIndividualGenre,
  getBooksByGenre,
  getIndividualPublisher,
  getBooksByPublisher,
};

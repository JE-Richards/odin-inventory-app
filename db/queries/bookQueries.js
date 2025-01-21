const pool = require('../pool');

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
      authors.first_name as "authorFirstName",
      authors.last_name as "authorLastName",
      genres.genre AS "bookGenre",
      books.cover_img_url AS "bookImg",
      publishers.publisher AS "bookPublisher",
      description as "bookDescription"
    FROM
      books as books
      LEFT JOIN authors AS authors ON books.author_id = authors.id
      LEFT JOIN genres AS genres ON books.genre_id = genres.id
      LEFT JOIN publishers AS publishers ON books.publisher_id = publishers.id
    WHERE
      books.id = ($1)
  `;

  const { rows } = await pool.query(SQL, [id]);
  return rows[0] || null;
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
  getAllBooks,
  getIndividualBook,
  getBooksByAuthor,
  getBooksByGenre,
  getBooksByPublisher,
};

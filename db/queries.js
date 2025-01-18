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
  return rows[0] || null;
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
  return rows[0] || null;
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

async function insertNewBook(bookData) {
  const {
    bookTitle,
    authorFirstName,
    authorLastName,
    bookGenre,
    bookDescription,
    bookCoverImgURL,
    bookPublisher,
  } = bookData;

  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    // Check if author already exists, if not insert them
    const insertAuthorSQL = `
    INSERT INTO authors (first_name, last_name)
    VALUES ($1, $2)
    ON CONFLICT (first_name, last_name) DO NOTHING
    RETURNING id;
  `;

    const authorResult = await client.query(insertAuthorSQL, [
      authorFirstName,
      authorLastName,
    ]);
    const authorId =
      authorResult.rows[0]?.id ||
      (
        await client.query(
          `SELECT id
        FROM authors
        WHERE first_name = $1 AND last_name = $2
        `,
          [authorFirstName, authorLastName]
        )
      ).rows[0].id;

    // Check if genre already exists, if not insert it
    const insertGenreSQL = `
    INSERT INTO genres (genre)
    VALUES ($1)
    ON CONFLICT (genre) DO NOTHING
    RETURNING id;
  `;

    const genreResult = await client.query(insertGenreSQL, [bookGenre]);
    const genreId =
      genreResult.rows[0]?.id ||
      (
        await client.query(
          `SELECT id 
    FROM genres
    WHERE genre = $1
    `,
          [bookGenre]
        )
      ).rows[0].id;

    // Check if publisher exists, if not insert them
    const insertPublisherSQL = `
    INSERT INTO publishers (publisher)
    VALUES ($1)
    ON CONFLICT (publisher) DO NOTHING
    RETURNING id;
  `;
    const publisherResult = await client.query(insertPublisherSQL, [
      bookPublisher,
    ]);
    const publisherId =
      publisherResult.rows[0]?.id ||
      (
        await client.query(
          `SELECT id
      FROM publishers
      WHERE publisher = $1`,
          [bookPublisher]
        )
      ).rows[0].id;

    // check if book already exists
    const doesBookExistSQL = `
    SELECT id 
    FROM books
    WHERE title = ($1) AND author_id = ($2)
  `;
    const bookExistsResult = await client.query(doesBookExistSQL, [
      bookTitle,
      authorId,
    ]);

    if (bookExistsResult.rowCount > 0) {
      throw new Error('Book already exists in the database');
    }

    // Insert the book if it doesn't exist
    const insertBookSQL = `
    INSERT INTO books (title, description, cover_img_url, author_id, genre_id, publisher_id)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING id;
  `;

    const bookInsertResult = await client.query(insertBookSQL, [
      bookTitle,
      bookDescription,
      bookCoverImgURL,
      authorId,
      genreId,
      publisherId,
    ]);

    await client.query('COMMIT');

    return bookInsertResult.rows[0].id; // id of newly inserted row if successful
  } catch (err) {
    // Rollback the transactions if error occurs
    await client.query('ROLLBACK');
    console.error('Error during database operation:', err);
    throw err;
  } finally {
    client.release();
  }
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
  insertNewBook,
};

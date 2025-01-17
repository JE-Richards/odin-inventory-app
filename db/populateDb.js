require('dotenv').config();
const { Client } = require('pg');
const sampleData = require('./sampleData');

// Table creation queries
const createAuthorsTableSQL = `
CREATE TABLE IF NOT EXISTS authors (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  first_name VARCHAR (255) NOT NULL,
  last_name VARCHAR (255) NOT NULL,
  bio TEXT,
  CONSTRAINT unique_author UNIQUE (first_name, last_name)
);
`;

const createBooksTableSQL = `
CREATE TABLE IF NOT EXISTS books (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  title VARCHAR (255) NOT NULL,
  author_id INTEGER NOT NULL,
  genre_id INTEGER,
  description TEXT,
  cover_img_url TEXT,
  publisher_id INTEGER,
  CONSTRAINT unique_book UNIQUE (title, author_id),
  CONSTRAINT fk_author FOREIGN KEY (author_id) REFERENCES authors(id),
  CONSTRAINT fk_genre FOREIGN KEY (genre_id) REFERENCES genres(id),
  CONSTRAINT fk_publisher FOREIGN KEY (publisher_id) REFERENCES publishers(id)
);
`;

const createGenresTableSQL = `
CREATE TABLE IF NOT EXISTS genres (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  genre VARCHAR(255) NOT NULL,
  CONSTRAINT unique_genre UNIQUE (genre)
);
`;

const createPublishersTableSQL = `
CREATE TABLE IF NOT EXISTS publishers (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  publisher VARCHAR (255) NOT NULL,
  CONSTRAINT unique_publisher UNIQUE (publisher)
);
`;

// Table comment queries
const addAuthorsCommentsSQL = `
COMMENT ON COLUMN authors.id IS 'Primary key for the authors table.';
COMMENT ON COLUMN authors.first_name IS 'Author''s first name.';
COMMENT ON COLUMN authors.last_name IS 'Author''s last name.';
COMMENT ON COLUMN authors.bio IS 'Optional: A short biography of the author.';
`;

const addBooksCommentsSQL = `
COMMENT ON COLUMN books.id IS 'Primary key for the books table.';
COMMENT ON COLUMN books.title IS 'Title of the book.';
COMMENT ON COLUMN books.author_id IS 'Id value for the books author, corresponding to the primary key in the ''authors'' table.';
COMMENT ON COLUMN books.genre_id IS 'Id value for the genre of the book, corresponding to the primary key in the ''genres'' table.';
COMMENT ON COLUMN books.description IS 'Optional: A brief description of the books content.';
COMMENT ON COLUMN books.cover_img_url IS 'Optional: A url for the books cover image.';
COMMENT ON COLUMN books.publisher_id IS 'Optional: Id value for the books publisher, corresponding to the primary key in the ''publishers'' table.';
`;

const addGenresCommentsSQL = `
COMMENT ON COLUMN genres.id IS 'Primary key for the genres table.';
COMMENT ON COLUMN genres.genre IS 'Genres a book can fall under.';
`;

const addPublishersCommentsSQL = `
COMMENT ON COLUMN publishers.id IS 'Primary key for the publishers table.';
COMMENT ON COLUMN publishers.publisher IS 'A book publisher.';
`;

// Insert sample data queries;
const insertAuthorDataSQL = `
INSERT INTO authors (first_name, last_name, bio)
VALUES
  ($1, $2, $3)
ON CONFLICT (first_name, last_name) DO NOTHING;
`;

const insertGenreDataSQL = `
INSERT INTO genres (genre)
VALUES
  ($1)
ON CONFLICT (genre) DO NOTHING;
`;

const insertPublisherDataSQL = `
INSERT INTO publishers (publisher)
VALUES
  ($1)
ON CONFLICT (publisher) DO NOTHING;
`;

const insertBookDataSQL = `
INSERT INTO BOOKS (title, author_id, genre_id, description, cover_img_url, publisher_id)
VALUES (
  $1,
  (SELECT id FROM authors WHERE first_name = $2 AND last_name = $3),
  (SELECT id FROM genres WHERE genre = $4),
  $5,
  $6,
  (SELECT id FROM publishers WHERE publisher = $7)
)
ON CONFLICT (title, author_id) DO NOTHING;
`;

// Helper functions;
async function createAndCommentTable(client, createTableSQL, addCommentsSQL) {
  await client.query(createTableSQL);
  await client.query(addCommentsSQL);
}

async function insertData(client, data) {
  for (const book of data) {
    try {
      await client.query(insertAuthorDataSQL, [
        book.authorFirstName,
        book.authorLastName,
        null,
      ]);
      await client.query(insertGenreDataSQL, [book.genre]);
      await client.query(insertPublisherDataSQL, [book.publisher]);
      await client.query(insertBookDataSQL, [
        book.title,
        book.authorFirstName,
        book.authorLastName,
        book.genre,
        book.description,
        book.coverImgURL,
        book.publisher,
      ]);
    } catch (error) {
      console.error(`Error inserting book "${book.title}": `, error.message);
    }
  }
}

async function populateDb() {
  const connectionString = process.argv[2] || process.env.DB_URL;

  if (!connectionString) {
    console.error('Error: Please provide a connection string as an argument.');
    console.error('Usage: node db/populateDb.js <connection_string>');
    process.exit(1);
  }

  console.log('Seeding db...');
  const client = new Client({
    connectionString,
  });

  try {
    console.log('Attempting to connect to the database...');
    await client.connect();
    console.log('Connection successful.');

    console.log('Running SQL queries');

    await createAndCommentTable(
      client,
      createAuthorsTableSQL,
      addAuthorsCommentsSQL
    );

    await createAndCommentTable(
      client,
      createGenresTableSQL,
      addGenresCommentsSQL
    );

    await createAndCommentTable(
      client,
      createPublishersTableSQL,
      addPublishersCommentsSQL
    );

    await createAndCommentTable(
      client,
      createBooksTableSQL,
      addBooksCommentsSQL
    );

    await insertData(client, sampleData);

    console.log('Database successfully seeded.');
  } catch (error) {
    console.error('Error while seeding the database: ', error.message);
  } finally {
    console.log('Closing the database connection...');
    await client.end();
    console.log('Done.');
  }
}

populateDb();

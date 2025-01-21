const pool = require('../pool');

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

async function deleteBook(bookId) {
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    // fetch book details for author, genre, and publisher
    const { rows: bookDetails } = await client.query(
      `
      SELECT author_id, genre_id, publisher_id
      FROM books
      WHERE id = ($1);
      `,
      [bookId]
    );

    if (bookDetails.length === 0) {
      throw new Error('Book not found');
    }

    // destructure + rename
    const {
      author_id: authorId,
      genre_id: genreId,
      publisher_id: publisherId,
    } = bookDetails[0];

    // Delete the book
    await client.query(
      `
      DELETE FROM books WHERE id = ($1);
      `,
      [bookId]
    );

    // Check and delete author if no other books exist
    const { rows: authorBooks } = await client.query(
      `
      SELECT COUNT(*) AS count
      FROM books
      WHERE author_id = ($1);
      `,
      [authorId]
    );

    if (parseInt(authorBooks[0].count, 10) === 0) {
      await client.query(
        `
        DELETE FROM authors WHERE id = ($1);
        `,
        [authorId]
      );
    }

    // Check and delete genre if no other books exist
    const { rows: genreBooks } = await client.query(
      `
      SELECT COUNT(*) AS count
      FROM books
      WHERE genre_id = ($1);
      `,
      [genreId]
    );

    if (parseInt(genreBooks[0].count, 10) === 0) {
      await client.query(
        `
        DELETE FROM genres WHERE id = ($1);
        `,
        [genreId]
      );
    }

    // Check and delete publisher if no other books exist
    const { rows: publisherBooks } = await client.query(
      `
      SELECT COUNT(*) AS count
      FROM books
      WHERE publisher_id = ($1);
      `,
      [genreId]
    );

    if (parseInt(publisherBooks[0].count, 10) === 0) {
      await client.query(
        `
        DELETE FROM publishers WHERE id = ($1);
        `,
        [publisherId]
      );
    }

    // commit transaction
    await client.query('COMMIT');
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('Error during database operation:', err);
    throw err;
  } finally {
    client.release();
  }
}

async function editBook(bookId, editedBookData) {
  const {
    bookTitle: editedBookTitle,
    authorFirstName: editedAuthorFirstName,
    authorLastName: editedAuthorLastName,
    bookGenre: editedBookGenre,
    bookDescription: editedBookDescription,
    bookCoverImgURL: editedBookCoverImgURL,
    bookPublisher: editedBookPublisher,
  } = editedBookData;

  const client = await pool.connect();

  try {
    client.query('BEGIN');

    // fetch current details for author, genre, publisher
    const { rows: currentDetails } = await client.query(
      `
      SELECT author_id, genre_id, publisher_id
      FROM books
      WHERE id = ($1);
      `,
      [bookId]
    );

    if (currentDetails.length === 0) {
      throw new Error('Book not found');
    }

    // destructure + rename
    const {
      author_id: currentAuthorId,
      genre_id: currentGenreId,
      publisher_id: currentPublisherId,
    } = currentDetails[0];

    // get current author details for comparison
    let newAuthorId = currentAuthorId;

    const { rows: currentAuthorDetails } = await client.query(
      `
      SELECT first_name, last_name
      FROM authors
      WHERE id = ($1)
      `,
      [currentAuthorId]
    );

    const {
      first_name: currentAuthorFirstName,
      last_name: currentAuthorLastName,
    } = currentAuthorDetails[0];

    // compare edited author details against current
    if (
      editedAuthorFirstName !== currentAuthorFirstName ||
      editedAuthorLastName !== currentAuthorLastName
    ) {
      // if details are different, need to check if currentAuthor has other book
      const { rows: authorBooks } = await client.query(
        `
        SELECT id
        FROM books
        WHERE author_id = ($1) AND id != ($2)
        `,
        [currentAuthorId, bookId]
      );
      // if currentAuthor has more books, create new author
      // if not, update currentAuthor
      if (authorBooks.length > 0) {
        const { rows: newAuthor } = await client.query(
          `
          INSERT INTO authors (first_name, last_name)
          VALUES ($1, $2)
          RETURNING id;
          `,
          [editedAuthorFirstName, editedAuthorLastName]
        );
        newAuthorId = newAuthor[0].id;
      } else {
        await client.query(
          `
          UPDATE authors
          SET
            first_name = ($1),
            last_name = ($2)
          WHERE id = ($3);
          `,
          [editedAuthorFirstName, editedAuthorLastName, currentAuthorId]
        );
      }
    }

    // get current genre details for comparison
    let newGenreId = currentGenreId;

    const { rows: currentGenreDetails } = await client.query(
      `
      SELECT genre
      FROM genres
      WHERE id = ($1)
      `,
      [currentGenreId]
    );

    const { genre: currentGenre } = currentGenreDetails[0];

    // compare edited genre against current
    if (editedBookGenre !== currentGenre) {
      // if details are different, need to check if genre has other books
      const { rows: genreBooks } = await client.query(
        `
        SELECT id
        FROM books
        WHERE genre_id = ($1) AND id != ($2)
        `,
        [currentGenreId, bookId]
      );
      // If currentGenre has more books, create new genre
      // if not, update currentGenre
      if (genreBooks.length > 0) {
        const { rows: newGenre } = await client.query(
          `
          INSERT INTO genres (genre)
          VALUES ($1)
          RETURNING id;
          `,
          [editedBookGenre]
        );
        newGenreId = newGenre[0].id;
      } else {
        await client.query(
          `
          UPDATE genres
          SET genre = ($1)
          WHERE id = ($2);
          `,
          [editedBookGenre, currentGenreId]
        );
      }
    }

    // get current publisher details for comparison
    let newPublisherId = currentPublisherId;

    const { rows: currentPublisherDetails } = await client.query(
      `
      SELECT publisher
      FROM publishers
      WHERE id = ($1)
      `,
      [currentPublisherId]
    );

    const { publisher: currentPublisher } = currentPublisherDetails[0];

    // compare edited publisher details against current
    if (editedBookPublisher !== currentPublisher) {
      // if details are different, need to check if currentPublisher has other books
      const { rows: publisherBooks } = await client.query(
        `
        SELECT id
        FROM books
        WHERE publisher_id = ($1) AND id != ($2);
        `,
        [currentPublisherId, bookId]
      );
      // if currentPublisher has more books, create new publisher
      // if not, update currentPublisher
      if (publisherBooks.length > 0) {
        const { rows: newPublisher } = await client.query(
          `
          INSERT INTO publishers (publisher)
          VALUES ($1)
          RETURNING id;
          `,
          [editedBookPublisher]
        );
        newPublisherId = newPublisher[0].id;
      } else {
        await client.query(
          `
          UPDATE publishers
          SET publisher = ($1)
          WHERE id = ($2);
          `,
          [editedBookPublisher, currentPublisherId]
        );
      }
    }

    // Update book details
    await client.query(
      `
      UPDATE books
      SET
        title = ($1),
        author_id = ($2),
        genre_id = ($3),
        description = ($4),
        cover_img_url = ($5),
        publisher_id = ($6)
      WHERE id = ($7)
      `,
      [
        editedBookTitle,
        newAuthorId,
        newGenreId,
        editedBookDescription,
        editedBookCoverImgURL,
        newPublisherId,
        bookId,
      ]
    );

    await client.query('COMMIT');
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('Error during database operation:', err);
    throw err;
  } finally {
    client.release();
  }
}

module.exports = {
  insertNewBook,
  deleteBook,
  editBook,
};

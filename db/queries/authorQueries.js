const pool = require('../pool');

async function getAllAuthors() {
  const SQL = `SELECT id, first_name, last_name FROM authors`;
  const { rows } = await pool.query(SQL);
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
  return rows[0] || null;
}

module.exports = {
  getAllAuthors,
  getIndividualAuthor,
};

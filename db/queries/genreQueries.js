const pool = require('../pool');

async function getAllGenres() {
  const SQL = `SELECT id, genre from genres`;
  const { rows } = await pool.query(SQL);
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

module.exports = {
  getAllGenres,
  getIndividualGenre,
};

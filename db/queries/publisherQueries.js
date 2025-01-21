const pool = require('../pool');

async function getAllPublishers() {
  const SQL = `SELECT id, publisher from publishers`;
  const { rows } = await pool.query(SQL);
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

module.exports = {
  getAllPublishers,
  getIndividualPublisher,
};

var express = require('express');
var router = express.Router();

const mysql = require('mysql2/promise');

// Set up your DB connection (update with your DB config)
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '', // or your MySQL root password
  database: 'DogWalkService'
});

// GET /api/dogs
router.get('/', async function(req, res) {
  try {
    const [rows] = await pool.query(`
      SELECT
        d.name AS dog_name,
        d.size,
        u.username AS owner_username
      FROM Dogs d
      JOIN Users u ON d.owner_id = u.user_id
    `);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch dogs.' });
  }
});

module.exports = router;

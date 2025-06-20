var express = require('express');
var router = express.Router();

const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'DogWalkService'
  });

  router.get('/summary', async function(req,res) {
    try {
        const [rows] = await pool.query(`
            SELECT
                u.username AS walker_username,
                COUNT(DISTINCT wr.rating_id) AS total_ratings,
                AVG(wr.rating) AS average_rating,
                COUNT(DISTINCT wr2.request_id) AS completed_walks
            FROM Users u
            LEFT JOIN WalkRatings wr ON wr.walker_id = u.user_id
            LEFT JOIN WalkRequests wr2 ON wr2.accepted_walker_id = u.user_id AND wr2.status = 'completed'
            WHERE u.role = 'walker'
            GROUP BY u.user_id, u.username
        `);
        res.json(rows);
    } catch(err) {
        res.status(500).json({ error: 'Failed to fetch walker summaries' });
    }
  });

  module.exports = router;
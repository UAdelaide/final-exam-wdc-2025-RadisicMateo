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
            COUNT(DISTINCT wrt.rating_id) AS total_ratings,
            AVG(wrt.rating) AS average_rating,
            COUNT(DISTINCT wreq.request_id) AS completed_walks
        FROM Users u
        LEFT JOIN WalkRatings wrt ON wrt.walker_id = u.user_id
        LEFT JOIN WalkApplications wa ON wa.walker_id = u.user_id AND wa.status = 'accepted'
        LEFT JOIN WalkRequests wreq ON wreq.request_id = wa.request_id AND wreq.status = 'completed'
        WHERE u.role = 'walker'
        GROUP BY u.user_id, u.username
        `);
        res.json(rows);
    } catch(err) {
        res.status(500).json({ error: 'Failed to fetch walker summaries' });
    }
  });

  module.exports = router;
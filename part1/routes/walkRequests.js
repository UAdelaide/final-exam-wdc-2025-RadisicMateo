var express = require('express');
var router = express.Router();

const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'DogWalkService'
});

router.get('/open', async function(req,rs) {
    try {
        const [rows] = await pool.query(`
            SELECT
              wr.request_id,
              d.name AS dog_name,
              wr.requested_time,
              wr.duration_minutes,
              wr.location,
              u.username AS owner_username
            FROM WalkRequests wr
            JOIN Dogs d ON wr.dog_id = d.dog_id
            JOIN Users u ON d.owner_id = u.user_id
            WHERE wr.status = 'open'
        `);
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: 'fail to fetch open walk requests' });
    }

});

module.exports = router;
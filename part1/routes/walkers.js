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
        const [rows] = await pool.query('
            SELECT
                u.username AS walker_username,
                COUNT(DISTINCT wr.rating_id) AS total_ratings,
                AVG(wr.rating) AS average_rating,
                COUNT(DISTINCT wr2.request_id) AS completed_walks
            FROM Users u
            LEFT JOIN WalkRatings wr ON 



        ')

    }
  });
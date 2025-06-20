var express = require('express');
var router = express.Router();

const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'DogWalkService'
  });


  router.get('/', async function(req, res)) {
    try {
        const [rows] = await pool.query(
            SELECT
             d.name AS dog_name,
             d.size,
             u.username AS owner_username
            FROM Dogs d
            JOIN Users u ON d.owner_id = u.user_id
        );
        res.json(rows);
    } catch (err) {
        res.status(500).json{{}}
    }
  }
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
        const [rows] = await pool.query('
        SELECT
            wr.request_id,
            d.name AS dog_name,
            wr.requested_time,
            
        ')
    }


});
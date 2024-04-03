// db.js

const mysql = require('mysql');

// Create a connection pool
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Cowboys1&',
    database: 'thejoyofpainting'
});

// Check if the connection is successful
pool.getConnection((err, connection) => {
    if (err) {
        console.error('Error connecting to database:', err);
        return;
    }
    console.log('Connected to database!');
    connection.release();
});

module.exports = pool;

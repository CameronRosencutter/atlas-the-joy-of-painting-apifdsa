// db.js

const mysql = require('mysql');

// Create connection pool
const pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: 'Cowboys1&',
    database: 'thejoyofpainting'
});

// Function to execute SQL queries
function query(sql, params) {
    return new Promise((resolve, reject) => {
        pool.query(sql, params, (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}

module.exports = {
    query
};

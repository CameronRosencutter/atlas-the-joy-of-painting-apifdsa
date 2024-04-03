const mysql = require('mysql');

// Create a MySQL connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Cowboys1&',
    database: 'thejoyofpainting'
});

// Connect to the database
connection.connect();

// Check if the episode exists before insertion
const episode = 'S01E01'; // Example episode
connection.query('SELECT * FROM compileddata WHERE episode = ?', [episode], (error, results, fields) => {
    if (error) {
        console.error('Error checking for existing episode:', error);
        return;
    }
    if (results.length > 0) {
        console.log('Episode already exists, skipping insertion.');
        // Handle duplicate entry
    } else {
        console.log('Episode does not exist, proceeding with insertion.');
        // Perform insertion
    }
});

// Close the connection
connection.end();

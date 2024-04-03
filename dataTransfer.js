const mysql = require('mysql');

// Connection parameters
const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'rooy',
    password: 'Cowboys1&',
    database: 'thejoyofpainting'
});

// Connect to the database
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL database:', err);
        return;
    }
    console.log('Connected to MySQL database!');
    
    // Call function to insert data
    // insertData(data);
});

// Function to insert data into the database
function insertData(data) {
    // Your insertion logic here
    // Example: Perform SQL INSERT queries using connection.query()
}

// Close connection to MySQL database
connection.end((err) => {
    if (err) {
        console.error('Error closing connection:', err);
        return;
    }
    console.log('Connection to MySQL database closed.');
});

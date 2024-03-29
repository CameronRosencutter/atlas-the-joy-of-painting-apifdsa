const mysql = require('mysql');

// Establish connection to MySQL database
const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'Cowboys1&',
    database: 'thejoyofpainting'
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL database:', err);
        return;
    }
    console.log('Connected to MySQL database!');
    
    // Call functions to extract data from CSV files
    extractDataFromCSV1();
    extractDataFromCSV2();
    extractDataFromCSV3();
});

// Function to extract data from CSV file 1
function extractDataFromCSV1() {
    // Code to extract data from CSV file 1
    // Insert data into MySQL tables
}

// Function to extract data from CSV file 2
function extractDataFromCSV2() {
    // Code to extract data from CSV file 2
    // Insert data into MySQL tables
}

// Function to extract data from CSV file 3
function extractDataFromCSV3() {
    // Code to extract data from CSV file 3
    // Insert data into MySQL tables
}

// Close connection to MySQL database
connection.end((err) => {
    if (err) {
        console.error('Error closing connection:', err);
        return;
    }
    console.log('Connection to MySQL database closed.');
});

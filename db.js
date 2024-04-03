const mysql = require('mysql');

// Connection parameters
const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'Cowboys1&', // Change this to your MySQL root password
});

// Connect to MySQL database server
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL database:', err);
        return;
    }
    console.log('Connected to MySQL database server!');

    // Grant necessary permissions to the user
    grantPermissions();
});

// Function to grant permissions to the user
function grantPermissions() {
    // Grant necessary permissions to your database user
    // Example: GRANT ALL PRIVILEGES ON thejoyofpainting.* TO 'your_user'@'localhost';
    const grantQuery = `
        GRANT ALL PRIVILEGES ON thejoyofpainting.* TO 'root'@'127.0.0.1';
    `;

    connection.query(grantQuery, (error, results) => {
        if (error) {
            console.error('Error granting permissions:', error);
            return;
        }
        console.log('Permissions granted successfully.');
    });
}

// Close the connection
connection.end((err) => {
    if (err) {
        console.error('Error closing connection:', err);
        return;
    }
    console.log('Connection closed.');
});

const fs = require('fs');
const mysql = require('mysql');
const csv = require('csv-parser');

// MySQL database connection configuration
const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: 'Cowboys1&',
  database: 'thejoyofpainting'
};

// Create a connection to the database
const connection = mysql.createConnection(dbConfig);

// Connect to the database
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL: ' + err.stack);
    return;
  }
  console.log('Connected to MySQL as ID ' + connection.threadId);
});

// Function to insert data into MySQL
function insertDataIntoMySQL(data, callback) {
  const sql = 'INSERT INTO compileddata (season_episode, title, release_date, img_src, youtube_src, subjects, colors) VALUES (?, ?, ?, ?, ?, ?, ?)';
  connection.query(sql, [data.season_episode, data.title, data.release_date, data.img_src, data.youtube_src, data.subjects, data.colors], (err, result) => {
    if (err) {
      console.error('Error inserting data into MySQL: ' + err.stack);
      return;
    }
    console.log('Data inserted successfully:', result);
    callback(); // Call the callback function to signal that insertion is complete
  });
}

// Function to process each CSV file
function processCSVFile(filePath, callback) {
  fs.createReadStream(filePath)
    .pipe(csv())
    .on('data', (row) => {
      // Extract data from the row, excluding the painting_index column
      const data = {
        season_episode: `${row.season}_${row.episode}`,
        title: row.painting_title,
        release_date: row.release_date,
        img_src: row.img_src,
        youtube_src: row.youtube_src,
        subjects: row.subjects,
        colors: row.colors
      };
      // Insert data into MySQL
      insertDataIntoMySQL(data, callback);
    })
    .on('end', () => {
      console.log('CSV file successfully processed:', filePath);
    });
}

// Process each CSV file
const csvFiles = ['The Joy Of Painting - Colors Used', 'The Joy Of Painting - Subject Matter', 'The Joy Of Painting - Episode Dates'];
let processedCount = 0;

function processNextFile() {
  processedCount++;
  if (processedCount === csvFiles.length) {
    console.log('All CSV files were successfully processed.');
    // Close the MySQL connection after processing all CSV files
    connection.end();
  }
}

csvFiles.forEach((file) => {
  processCSVFile(file, processNextFile);
});

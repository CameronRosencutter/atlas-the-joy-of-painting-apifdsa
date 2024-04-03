const fs = require('fs');
const { connection } = require('./db');
const { pool } = require('./db');


// Define the function to parse ColorsUsed data
function parseColorsUsedData(rawData) {
    // Split the raw data into lines
    const lines = rawData.split('\n');

    // Initialize an empty array to store parsed data
    const parsedData = [];

    // Iterate over each line of the data
    lines.forEach(line => {
        // Check if the line is empty or does not contain expected number of fields
        if (line.trim() === '' || line.split(',').length < 10) {
            // Skip this line
            return;
        }

        // Split the line into individual fields
        const fields = line.split(/,(?! )/gm);

        // Extracting the relevant fields
        const colors = fields[8].slice(1, -1).split(',').map(color => color.trim().replace(/'/g, ''));
        const colorHex = fields[9].slice(1, -1).split(',').map(color => color.trim().replace(/'/g, ''));

        const painting = {
            painting_index: parseInt(fields[1].trim()),
            img_src: fields[2].trim(),
            painting_title: fields[3].trim(),
            season: parseInt(fields[4].trim()),
            episode: parseInt(fields[5].trim()),
            num_colors: parseInt(fields[6].trim()),
            youtube_src: fields[7].trim(),
            colors: colors,
            color_hex: colorHex
        };

        // Push the painting object to the parsedData array
        parsedData.push(painting);
    });

    // Return the parsed data
    return parsedData;
}

// Read the data from the file
fs.readFile('The Joy Of Painiting - Colors Used', 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading file:', err);
        return;
    }

    // Parse the data
    const parsedData = parseColorsUsedData(data);

    // Insert the parsed data into the database
    insertColorsData(parsedData);
});

// Function to insert parsed data into the database
function insertColorsData(data) {
    // Define the SQL query to insert data into the database
    const sql = 'INSERT INTO CompiledData (painting_index, img_src, painting_title, season, episode, num_colors, youtube_src, colors, color_hex) VALUES ?';

    // Map the parsed data to match the format required for bulk insertion
    const values = data.map(painting => [
        painting.painting_index,
        painting.img_src,
        painting.painting_title,
        painting.season,
        painting.episode,
        painting.num_colors,
        painting.youtube_src,
        painting.colors.join(','),
        painting.color_hex.join(',')
    ]);

    // Execute the SQL query
    connection.query(sql, [values], (error, results, fields) => {
        if (error) {
            console.error('Error inserting data:', error);
            return;
        }
        console.log('Data inserted successfully!');
    });
}

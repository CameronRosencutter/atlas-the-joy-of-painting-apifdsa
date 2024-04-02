const fs = require('fs');
const processDataAndInsertIntoDatabase = require('./DataProcessor');



// Create a connection pool to manage connections to the MySQL database
const pool = mysql.createPool({
    connectionLimit: 10,
    host: '127.0.0.1',
    user: 'root',
    password: 'Cowboys1&',
    database: 'thejoyofpainting'
});

// Function to extract data from CSV file 1 (Subject Matter)
async function ExtractfromSubjectMatter() {
    function parseEpisodeData(rawData, fieldsHeader) {
        // Split the raw data into lines
        const lines = rawData.split('\n');
    
        // Initialize an empty array to store parsed data
        const parsedData = [];
    
        // Iterate over each line of the data
        lines.forEach(line => {
            // Check if the line is empty
            if (line.trim() === '') {
                // Skip this line
                return;
            }
    
            // Split the line into individual fields
            const fields = line.split(',');
    
            // Extracting the relevant fields
            const episode = {
                season_episode: fields[0].trim(),
                title: fields[1].replace(/"/g, '').trim(), // Remove extra quotes and trim whitespace
                subjects: extractSubjects(fields.slice(2), fieldsHeader) // Extract subjects based on field values
            };
    
            // Push the episode object to the parsedData array
            parsedData.push(episode);
        });
    
        // Return the parsed data
        return parsedData;
    }
    
    // Function to extract subjects based on field values
    function extractSubjects(fields, fieldsHeader) {
        const subjects = [];
    
        // Iterate over each field value
        fields.forEach((field, index) => {
            // If the field value is '1', add the corresponding subject from the header to the subjects array
            if (field.trim() === '1') {
                subjects.push(fieldsHeader[index].trim());
            }
        });
    
        // Return the subjects array
        return subjects;
    }
    
    // Read the data from the file
    fs.readFile('The Joy Of Painiting - Subject Matter', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            return;
        }
    
        // Get the header fields
        const lines = data.trim().split('\n');
        const fieldsHeader = lines[0].split(',');
    
        // Parse the data
        const parsedData = parseEpisodeData(data, fieldsHeader);
    
        // Do something with the parsed data
        console.log(parsedData);
    });
    
    try {
        const rawData = await fs.promises.readFile('The Joy Of Painiting - Subject Matter', 'utf8');
        // Parse the data and insert it into the database
        // Example: await insertDataIntoDatabase(rawData);
    } catch (error) {
        console.error('Error reading file:', error);
    }
}

// Function to extract data from CSV file 2 (Episode Dates)
async function ExtractfromEpisodeDates() {
    function parseEpisodeReleaseData(rawData) {
        // Split the raw data into lines
        const lines = rawData.split('\n');
    
        // Initialize an empty array to store parsed data
        const parsedData = [];
    
        // Iterate over each line of the data
        lines.forEach(line => {
            // Check if the line is empty
            if (line.trim() === '') {
                // Skip this line
                return;
            }
    
            // Extracting the title and date of release
            const [title, date] = line
                .replace(/"/g, '') // Remove quotes
                .replace(/^\s*|\s*$/g, '') // Remove leading and trailing whitespaces
                .split(' (');
    
            // Push the episode object to the parsedData array
            parsedData.push({
                title: title.trim(),
                release_date: date.replace(')', '').trim()
            });
        });
    
        // Return the parsed data
        return parsedData;
    }
    
    // Read the data from the file
    fs.readFile('The Joy Of Painting - Episode Dates', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            return;
        }
    
        // Parse the data
        const parsedData = parseEpisodeReleaseData(data);
    
        // Do something with the parsed data
        console.log(parsedData);
    });
    try {
        const rawData = await fs.promises.readFile('The Joy Of Painting - Episode Dates', 'utf8');
        // Parse the data and insert it into the database
        // Example: await insertDataIntoDatabase(rawData);
    } catch (error) {
        console.error('Error reading file:', error);
    }
}

// Function to extract data from CSV file 3 (Colors Used)
async function ExtractfromColorsUsed() {
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

    // Do something with the parsed data
    console.log(parsedData);
});
    try {
        const rawData = await fs.promises.readFile('The Joy Of Painiting - Colors Used', 'utf8');
        // Parse the data and insert it into the database
        // Example: await insertDataIntoDatabase(rawData);
    } catch (error) {
        console.error('Error reading file:', error);
    }
}

// Function to insert parsed data into the database
async function insertDataIntoDatabase(rawData) {
    // Example: Execute SQL queries to insert data into the database using the pool.query function
}

// Run the extraction functions
async function runExtraction() {
    await ExtractfromSubjectMatter();
    await ExtractfromEpisodeDates();
    await ExtractfromColorsUsed();
}

// Execute the extraction process
runExtraction().then(() => {
    console.log('Data extraction completed successfully.');
}).catch((error) => {
    console.error('Error during data extraction:', error);
});

processDataAndInsertIntoDatabase();

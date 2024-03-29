const fs = require('fs');

// Define the function to parse Episode data
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

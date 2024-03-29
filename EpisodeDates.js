const fs = require('fs');

// Define the function to parse Episode data
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

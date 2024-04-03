const fs = require('fs');

// Function to extract data from CSV file 1 (Subject Matter)
async function extractFromSubjectMatter() {
    try {
        const rawData = await fs.promises.readFile('The Joy Of Painting - Subject Matter.csv', 'utf8');
        // Parse the data and return it or process it further
        return rawData;
    } catch (error) {
        console.error('Error reading Subject Matter file:', error);
        throw error;
    }
}

// Function to extract data from CSV file 2 (Episode Dates)
async function extractFromEpisodeDates() {
    try {
        const rawData = await fs.promises.readFile('The Joy Of Painting - Episode Dates.csv', 'utf8');
        // Parse the data and return it or process it further
        return rawData;
    } catch (error) {
        console.error('Error reading Episode Dates file:', error);
        throw error;
    }
}

// Function to extract data from CSV file 3 (Colors Used)
async function extractFromColorsUsed() {
    try {
        const rawData = await fs.promises.readFile('The Joy Of Painting - Colors Used.csv', 'utf8');
        // Parse the data and return it or process it further
        return rawData;
    } catch (error) {
        console.error('Error reading Colors Used file:', error);
        throw error;
    }
}

module.exports = {
    extractFromSubjectMatter,
    extractFromEpisodeDates,
    extractFromColorsUsed
};

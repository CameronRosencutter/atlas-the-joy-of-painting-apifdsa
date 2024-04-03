
const DataProcessor = require('./DataProcessor');

// File paths
const subjectMatterPath = './SubjectMatter.js';
const episodeDatesPath = './EpisodeDates.js';
const colorsUsedPath = './ColorsUsed.js';

// Read data from files
fs.readFile(subjectMatterPath, 'utf8', (err1, subjectMatterData) => {
    if (err1) {
        console.error('Error reading subject matter file:', err1);
        return;
    }
    fs.readFile(episodeDatesPath, 'utf8', (err2, episodeDatesData) => {
        if (err2) {
            console.error('Error reading episode dates file:', err2);
            return;
        }
        fs.readFile(colorsUsedPath, 'utf8', (err3, colorsUsedData) => {
            if (err3) {
                console.error('Error reading colors used file:', err3);
                return;
            }
            processData(subjectMatterData, episodeDatesData, colorsUsedData);
        });
    });
});

// Function to process data
function processData(subjectMatterData, episodeDatesData, colorsUsedData) {
    const compiledData = DataProcessor.processData(subjectMatterData, episodeDatesData, colorsUsedData);
    if (compiledData) {
        // Do something with the compiled data
        console.log('Compiled data:', compiledData);
    } else {
        console.error('Failed to process data.');
    }
}

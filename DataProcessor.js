// Function to parse subject matter data
function parseSubjectMatterData(subjectMatterData) {
    // Your parsing logic here
    // Example: Split subjectMatterData into lines, then split each line into fields
    const lines = subjectMatterData.split('\n');
    const parsedData = lines.map(line => {
        const fields = line.split(',');
        // Extract relevant information from fields and return as an object
        return {
            season_episode: fields[0].trim(),
            title: fields[1].trim(),
            subjects: fields.slice(2).map(subject => subject.trim())
        };
    });
    return parsedData;
}


// Function to parse episode dates data
function parseEpisodeDatesData(episodeDatesData) {
    // Your parsing logic here
    // Example: Split episodeDatesData into lines, then extract title and release date from each line
    const lines = episodeDatesData.split('\n');
    const parsedData = lines.map(line => {
        const [title, releaseDate] = line.split(' (');
        return {
            title: title.trim(),
            release_date: releaseDate.replace(')', '').trim()
        };
    });
    return parsedData;
}


// Function to parse colors used data
function parseColorsUsedData(colorsUsedData) {
    // Your parsing logic here
    // Example: Split colorsUsedData into lines, then split each line into fields
    const lines = colorsUsedData.split('\n');
    const parsedData = lines.map(line => {
        const fields = line.split(',');
        // Extract relevant information from fields and return as an object
        return {
            painting_index: parseInt(fields[1].trim()),
            img_src: fields[2].trim(),
            painting_title: fields[3].trim(),
            // Add other fields as needed
        };
    });
    return parsedData;
}


function combineData(subjectMatterData, episodeDatesData, colorsUsedData) {
    const combinedData = [];

    // Loop through each parsed data array and combine corresponding entries
    for (let i = 0; i < subjectMatterData.length; i++) {
        const combinedEntry = {
            // Add common properties
            season_episode: subjectMatterData[i].season_episode,
            title: subjectMatterData[i].title,
            subjects: subjectMatterData[i].subjects
        };

        // Find matching entries in other data arrays and add their properties
        const matchingEpisode = episodeDatesData.find(entry => entry.title === subjectMatterData[i].title);
        const matchingColors = colorsUsedData.find(entry => entry.painting_title === subjectMatterData[i].title);

        if (matchingEpisode) {
            combinedEntry.release_date = matchingEpisode.release_date;
        }

        if (matchingColors) {
            combinedEntry.painting_index = matchingColors.painting_index;
            combinedEntry.img_src = matchingColors.img_src;
            combinedEntry.painting_title = matchingColors.painting_title;
            // Add other fields from colorsUsedData as needed
        }

        // Push the combined entry to the result array
        combinedData.push(combinedEntry);
    }

    return combinedData;
}


// Function to process and combine data from all files
function processData(subjectMatterData, episodeDatesData, colorsUsedData) {
    try {
        // Parse subject matter data
        const subjectMatterParsed = parseSubjectMatterData(subjectMatterData);
        console.log('Subject matter data parsed successfully.');

        // Parse episode dates data
        const episodeDatesParsed = parseEpisodeDatesData(episodeDatesData);
        console.log('Episode dates data parsed successfully.');

        // Parse colors used data
        const colorsUsedParsed = parseColorsUsedData(colorsUsedData);
        console.log('Colors used data parsed successfully.');

        // Combine parsed data into a single array or object
        const compiledData = combineData(subjectMatterParsed, episodeDatesParsed, colorsUsedParsed);
        console.log('Data combined successfully.');

        return compiledData;
    } catch (error) {
        console.error('Error processing data:', error);
        return null; // Return null to indicate failure
    }

}


module.exports = {
    processData: processData
};

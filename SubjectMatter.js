const fs = require('fs');

// Mapping of subject indices to their names
const subjectNames = [
  'Apple_Frame', 'Aurora_Borealis', 'Barn', 'Beach', 'Boat', 'Bridge', 'Building', 'Bushes', 'Cabin', 'Cactus',
  'Circle_Frame', 'Cirrus', 'Cliff', 'Clouds', 'Conifer', 'Cumulus', 'Deciduous', 'Diane_Andre', 'Dock',
  'Double_Oval_Frame', 'Farm', 'Fence', 'Fire', 'Florida_Frame', 'Flowers', 'Fog', 'Framed', 'Grass', 'Guest',
  'Half_Circle_Frame', 'Half_Oval_Frame', 'Hills', 'Lake', 'Lakes', 'Lighthouse', 'Mill', 'Moon', 'Mountain',
  'Mountains', 'Night', 'Ocean', 'Oval_Frame', 'Palm_Trees', 'Path', 'Person', 'Portrait', 'Rectangle_3D_Frame',
  'Rectangular_Frame', 'River', 'Rocks', 'Seashell_Frame', 'Snow', 'Snowy_Mountain', 'Split_Frame', 'Steve_Ross',
  'Structure', 'Sun', 'Tomb_Frame', 'Tree', 'Trees', 'Triple_Frame', 'Waterfall', 'Waves', 'Windmill',
  'Window_Frame', 'Winter', 'Wood_Framed'
];

// Function to get subject names for the given episode
function getSubjectNames(subjects) {
  const usedSubjects = [];
  subjects.forEach((subject, index) => {
    if (subject === '1') {
      usedSubjects.push(subjectNames[index]);
    }
  });
  return usedSubjects;
}

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
      subjects: getSubjectNames(fields.slice(2)) // Extract subject names based on field values
    };

    // Push the episode object to the parsedData array
    parsedData.push(episode);
  });

  // Return the parsed data
  return parsedData;
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

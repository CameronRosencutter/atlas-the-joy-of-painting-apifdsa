const fs = require('fs');
const csv = require('csv-parser');

// Read the CSV file
fs.createReadStream('./The Joy Of Painting - Colors Used')
  .pipe(csv())
  .on('data', (row) => {
    // Process each row of the CSV
    const paintingData = {
      painting_index: row.painting_index,
      img_src: row.img_src,
      painting_title: row.painting_title,
      youtube_src: row.youtube_src,
      colors: []
    };

    // Extract colors
    for (const [key, value] of Object.entries(row)) {
      if (!key.endsWith('_hex') && key !== 'painting_index' && key !== 'img_src' && key !== 'painting_title' && key !== 'youtube_src') {
        paintingData.colors.push(value.toString()); // Convert value to string
      }
    }

    // Log painting data
    console.log('Painting Index:', paintingData.painting_index);
    console.log('Image Source:', paintingData.img_src);
    console.log('Painting Title:', paintingData.painting_title);
    console.log('YouTube Source:', paintingData.youtube_src);
    console.log('Colors:', paintingData.colors.join(', '));
    console.log('------------------------');
  })
  .on('end', () => {
    console.log('CSV file successfully processed.');
  })
  .on('error', (err) => {
    console.error('Error:', err.message);
  });

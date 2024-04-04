const express = require('express');
const app = express();
const port = 3000;

// Import routes
const episodesRouter = require('./routes/episodes');
const colorsRouter = require('./routes/colors');
const titlesRouter = require('./routes/titles');

// Use routes
app.use('/episodes', episodesRouter);
app.use('/colors', colorsRouter);
app.use('/titles', titlesRouter);

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

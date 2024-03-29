const mongoose = require('mongoose');
const Episode = require('./models/Episode'); // Import Episode model

// Connect to MongoDB database
mongoose.connect('mongodb://localhost:27017/thejoyofpainting', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
        // Insert data into MongoDB collections
        // Example:
        Episode.create({ title: 'A Walk in the Woods', seasonNumber: 1, episodeNumber: 1 })
            .then(() => console.log('Data inserted successfully'))
            .catch(err => console.error('Error inserting data:', err))
            .finally(() => mongoose.disconnect()); // Disconnect from MongoDB after inserting data
    })
    .catch(err => console.error('Error connecting to MongoDB:', err));

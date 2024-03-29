// databaseSetup.js

const { MongoClient } = require('mongodb');

async function setupDatabase() {
    const uri = "mongodb://localhost:27017";
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
        await client.connect();
        console.log('Connected to MongoDB');

        const database = client.db('thejoyofpainting');

        // Create collections
        await createCollections(database);

        // Insert data into collections
        await insertDataIntoCollections(database);

        console.log('Database setup completed successfully');
    } catch (error) {
        console.error('Error setting up database:', error);
    } finally {
        await client.close();
    }
}

async function createCollections(database) {
    try {
        // Create "episodes" collection
        await database.createCollection('episodes');
        console.log('Collection "episodes" created successfully');

        // Add more collection creation logic here if needed
    } catch (error) {
        console.error('Error creating collections:', error);
        throw error;
    }
}

async function insertDataIntoCollections(database) {
    try {
        // Insert data into "episodes" collection
        const episodesCollection = database.collection('episodes');
        await episodesCollection.insertOne({ title: 'A Walk in the Woods', seasonNumber: 1, episodeNumber: 1 });
        console.log('Document inserted into "episodes" collection successfully');

        // Add more data insertion logic here if needed
    } catch (error) {
        console.error('Error inserting data into collections:', error);
        throw error;
    }
}

module.exports = { setupDatabase };

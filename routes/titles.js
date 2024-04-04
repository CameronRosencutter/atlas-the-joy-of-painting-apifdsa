const express = require('express');
const router = express.Router();
const mysqlConnection = require('../db');

// Route for retrieving all titles
router.get('/', (req, res) => {
    mysqlConnection.query('SELECT title FROM CompiledData', (error, results) => {
        if (error) {
            console.error('Error executing SQL query:', error);
            res.status(500).json({ error: 'Internal server error' });
        } else {
            // Extract titles from results
            const titles = results.map(result => result.title).filter(Boolean);
            res.json(titles);
        }
    });
});

module.exports = router;

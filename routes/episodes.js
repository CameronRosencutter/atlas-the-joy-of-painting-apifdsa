const express = require('express');
const router = express.Router();
const mysqlConnection = require('../db');

// Route for retrieving all episodes
router.get('/', (req, res) => {
    mysqlConnection.query('SELECT * FROM CompiledData', (error, results) => {
        if (error) {
            console.error('Error executing SQL query:', error);
            res.status(500).json({ error: 'Internal server error' });
        } else {
            res.json(results);
        }
    });
});

module.exports = router;

const express = require('express');
const router = express.Router();
const mysqlConnection = require('../db');

// Route for retrieving all colors
router.get('/', (req, res) => {
    mysqlConnection.query('SELECT DISTINCT colors FROM CompiledData', (error, results) => {
        if (error) {
            console.error('Error executing SQL query:', error);
            res.status(500).json({ error: 'Internal server error' });
        } else {
            // Extract colors from results
            const colors = results.map(result => result.colors).filter(Boolean);
            res.json(colors);
        }
    });
});

module.exports = router;

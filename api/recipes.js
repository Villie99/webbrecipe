const express = require('express');
const router = express.Router();
const axios = require('axios');

// Define your API credentials
const APP_ID = '96ad569ed652fcf87bb20475397e73b6';
const APP_KEY = 'ed5568ce';

// The /api/recipes route will be handled here
router.get('/recipes', async (req, res) => {
    try {
        const ingredients = req.query.q; // Get the 'q' parameter from the URL
        const externalApiUrl = `https://api.edamam.com/api/recipes/v2?type=public&q=${ingredients}&app_id=${APP_ID}&app_key=${APP_KEY}`;

        // Make the request to the external API
        const response = await axios.get(externalApiUrl);
        const data = response.data;

        // Send the data back to the frontend
        res.json(data);
    } catch (error) {
        console.error("Error fetching recipes:", error);
        res.status(500).json({ error: 'Failed to fetch recipes.' });
    }
});

module.exports = router;
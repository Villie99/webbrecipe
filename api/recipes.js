const express = require('express');
const router = express.Router();
const axios = require('axios');

const APP_ID = ' process.env.APP_ID';
const APP_KEY = 'process.env.APP_KEY';

router.get('/recipes', async (req, res) => {
    try {
        const ingredients = req.query.q;
        if (!ingredients) {
            return res.status(400).json({ error: 'No ingredients provided' }); 
        }

        const externalApiUrl = `https://api.edamam.com/api/recipes/v2?type=public&q=${ingredients}&app_id=${APP_ID}&app_key=${APP_KEY}`;
        console.log('Calling external API:', externalApiUrl);

        const response = await axios.get(externalApiUrl);
        const data = response.data;

        const hits = data.hits || [];
        console.log('API response received, recipes found:', hits.length);

        const simplifiedRecipes = hits.map(hit => ({
            name: hit.recipe.label,
            image: hit.recipe.image,
            ingredientList: hit.recipe.ingredientLines
        }));

        res.json(simplifiedRecipes);
    } catch (error) {
        console.error("Error fetching recipes:", error.message);
        res.status(500).json({ error: 'Failed to fetch recipes.' });
    }
});

module.exports = router;
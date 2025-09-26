const $searchButton = $('#search-button');

$searchButton.on('click', async () => {
    const ingredients = getAllIngredients();
    console.log(ingredients.length);

    if (ingredients.length === 0) {
        return;
    } else {
        try {
            const recipes = await recipeSearch(ingredients); 
            displayRecipes(recipes);
        } catch (error) {
            console.error("Error:", error);
        }
    }
});

function getAllIngredients(){
    const ingredientsWritten = document.querySelectorAll('input[id^="search-ingredient-"]');
    const ingredients = [];

    ingredientsWritten.forEach(ingredient => {
        if (ingredient.value.trim() !== '') {
            console.log(ingredient.value.trim())
            ingredients.push(ingredient.value.trim());
        }
    });
    return ingredients;
}

function displayRecipes(recipes) {
    
    if (recipes && recipes.length > 0) {
        console.log('Simplified recipes:', recipes);
        
        localStorage.setItem('recipes', JSON.stringify(recipes));
        console.log('Simplified recipes stored in localStorage');
        
        slideTransitionTo('results.html');
    } else {
        console.error('No recipes to store');
        alert('No recipes found. Try different ingredients.');
    }
}
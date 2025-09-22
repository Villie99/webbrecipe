const $searchButton = $('#search-button');

$searchButton.on('click', async () => {
    const ingredients = getAllIngredients();
    console.log(ingredients.length);

    if (ingredients.length === 0) {
        alert("Du måste skriva in minst en ingridiens");
        return;
    } else {
        try {
            const recipes = await recipeSearch(ingredients); 
            displayRecipes(recipes);
        } catch (error) {
            console.error("Error:", error);
            alert("Något gick fel när recepten hämtades");
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

function displayRecipes(recipes){
    if (recipes && recipes.length > 0) {
        const simplifiedRecipes = recipes.map(recipeItem => ({
            name: recipeItem.recipe.label,
            image: recipeItem.recipe.image,
            ingredientList: recipeItem.recipe.ingredientLines
        }));
        
        console.log('Simplified recipes:', simplifiedRecipes);
        
        localStorage.setItem('recipes', JSON.stringify(simplifiedRecipes));
        console.log('Simplified recipes stored in localStorage');
        
        slideTransitionTo('results.html');
    } else {
        console.error('No recipes to store');
        alert('No recipes found. Try different ingredients.');
    }
}
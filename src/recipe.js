
function openRecipe(recipeIndex) {
    const storedRecipes = localStorage.getItem('recipes');
    
    if (storedRecipes) {
        const recipes = JSON.parse(storedRecipes);
        
        if (recipes[recipeIndex]) {
            const selectedRecipe = recipes[recipeIndex];
            
            localStorage.setItem('selectedRecipe', JSON.stringify(selectedRecipe));

            window.location.href = 'recipe.html';
        }
    }
}

function populateRecipeSlide(selectedRecipe){
    console.log(selectedRecipe);

    const recipePresentation = `<div class="Recipe-presentation">
                        <img id="recipe-image" src="${selectedRecipe.image}" alt="${selectedRecipe.name}" style="display: block; margin: 0 auto;">
                        <h3 id="recipe-name">${selectedRecipe.name}</h3>
                        <h4>Ingredienser:</h4>
                        <ul id="recipe-ingredients">
                            ${selectedRecipe.ingredientList.map(ingredient => `<li>${ingredient}</li>`).join('')}
                        </ul>
                    </div>`;
    
    document.querySelector('main').innerHTML = '<h2>Valt Recept</h2>' + recipePresentation;
}

window.addEventListener('DOMContentLoaded', function() {
    if (window.location.pathname.includes('recipe.html')) {
        const selectedRecipe = localStorage.getItem('selectedRecipe');
        if (selectedRecipe) {
            const recipe = JSON.parse(selectedRecipe);
            populateRecipeSlide(recipe);
        }
    }
});

function addToFavorites() {
    const selectedRecipe = localStorage.getItem('selectedRecipe');
    if (selectedRecipe) {
        const recipe = JSON.parse(selectedRecipe);
        
        // Get existing favorites or create empty array
        let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        
        // Check if recipe is already in favorites
        const isAlreadyFavorite = favorites.some(fav => fav.name === recipe.name);
        
        const favoriteButton = document.getElementById('add-favorite-btn');
        
        if (!isAlreadyFavorite) {
            favorites.push(recipe);
            localStorage.setItem('favorites', JSON.stringify(favorites));
            
            // Change button appearance to show it's been clicked
            favoriteButton.textContent = '✓ Tillagd i favoriter';
            favoriteButton.style.backgroundColor = '#28a745';
            favoriteButton.style.cursor = 'default';
            favoriteButton.disabled = true;
            
            alert(`${recipe.name} har lagts till i favoriter!`);
        } else {
            // Already in favorites - show it's already added
            favoriteButton.textContent = '✓ Redan i favoriter';
            favoriteButton.style.backgroundColor = '#6c757d';
            favoriteButton.style.cursor = 'default';
            favoriteButton.disabled = true;
            
            alert(`${recipe.name} finns redan i favoriter!`);
        }
    }
}

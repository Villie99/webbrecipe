// Load recipes when page loads
document.addEventListener('DOMContentLoaded', function() {
    console.log('Results page loaded');

    const recipesData = localStorage.getItem('recipes');
    console.log('Raw localStorage data:', recipesData);
    
    if (recipesData && recipesData !== 'undefined' && recipesData !== 'null') {
        try {
            const simplifiedRecipes = JSON.parse(recipesData);
            console.log('Loaded recipes:', simplifiedRecipes);
            populateResult(simplifiedRecipes);
        } catch (error) {
            console.error('Error parsing recipes data:', error);
        }
    } else {
        console.log('No valid recipes found in localStorage')
    }
});

function populateResult(simplifiedRecipes){
    console.log('Populating results with:', simplifiedRecipes);
    
    const recipeGrid = document.querySelector('.recipe-grid');
    
    if (!recipeGrid) {
        console.error('Recipe grid not found!');
        return;
    }
    
    recipeGrid.innerHTML = '';
    
    simplifiedRecipes.slice(0, 24).forEach((recipe, index) => {
        const recipeCard = `
            <div class="recipe-card">
                <div class="recipe-image">
                    <img src="${recipe.image}" alt="${recipe.name}" 
                         onerror="this.src='https://via.placeholder.com/400x300?text=No+Image'">
                </div>
                <div class="recipe-content">
                    <h3>${recipe.name}</h3>
                    <div class="search-button">
                        <button id="button-recipe-${index}" onclick="openRecipe(${index})">Visa recept</button>
                    </div>
                </div>
            </div>
        `;
        
        recipeGrid.innerHTML += recipeCard;
    });
    
    console.log(`Populated ${Math.min(simplifiedRecipes.length, 24)} recipe cards`);
}

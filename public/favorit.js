window.addEventListener('DOMContentLoaded', function() {
    if (window.location.pathname.includes('favorit.html')) {
        loadFavorites();
    }
});

function loadFavorites() {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const favoritesGrid = document.getElementById('favorites-grid');
    const noFavoritesDiv = document.getElementById('no-favorites');
    
    if (favorites.length === 0) {
        // Show "no favorites" message
        favoritesGrid.style.display = 'none';
        noFavoritesDiv.style.display = 'block';
    } else {
        // Hide "no favorites" message and show grid
        noFavoritesDiv.style.display = 'none';
        favoritesGrid.style.display = 'grid';
        
        // Clear existing content
        favoritesGrid.innerHTML = '';
        
        // Create recipe cards for each favorite
        favorites.forEach((recipe, index) => {
            const recipeCard = createRecipeCard(recipe, index);
            favoritesGrid.appendChild(recipeCard);
        });
    }
}

function createRecipeCard(recipe, index) {
    const cardDiv = document.createElement('div');
    cardDiv.className = 'recipe-card';
    
    cardDiv.innerHTML = `
        <div class="recipe-image">
            <img src="${recipe.image}" alt="${recipe.name}">
        </div>
        <div class="recipe-content">
            <h3>${recipe.name}</h3>
            <div class="search-button">
                <button id="button-favorite-${index}" onclick="openFavoriteRecipe(${index})">Visa recept</button>
            </div>
            <div class="search-button" style="margin-top: 10px;">
                <button onclick="removeFavorite(${index})" style="background-color: #dc3545;">Ta bort</button>
            </div>
        </div>
    `;
    
    return cardDiv;
}

function openFavoriteRecipe(favoriteIndex) {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    
    if (favorites[favoriteIndex]) {
        const selectedRecipe = favorites[favoriteIndex];
        
        // Store the selected recipe for the recipe detail page
        localStorage.setItem('selectedRecipe', JSON.stringify(selectedRecipe));
        
        // Navigate to recipe detail page
        window.location.href = 'recipe.html';
    }
}

function removeFavorite(favoriteIndex) {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    
    if (favorites[favoriteIndex]) {
        const recipeName = favorites[favoriteIndex].name;
        
        if (confirm(`Vill du ta bort "${recipeName}" från favoriter?`)) {
            // Remove the recipe from favorites
            favorites.splice(favoriteIndex, 1);
            
            // Update localStorage
            localStorage.setItem('favorites', JSON.stringify(favorites));
            
            // Reload the favorites display
            loadFavorites();
        }
    }
}
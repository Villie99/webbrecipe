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

        favoritesGrid.style.display = 'none';
        noFavoritesDiv.style.display = 'block';
    } else {

        noFavoritesDiv.style.display = 'none';
        favoritesGrid.style.display = 'grid';

        favoritesGrid.innerHTML = '';

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
                <button id="button-favorite-${index}" onclick="openFavoriteRecipe(${index})">Show Recipe</button>
            </div>
            <div class="search-button" style="margin-top: 10px;">
                <button onclick="removeFavorite(${index})" style="background-color: #dc3545;">Remove</button>
            </div>
        </div>
    `;
    
    return cardDiv;
}

function openFavoriteRecipe(favoriteIndex) {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    
    if (favorites[favoriteIndex]) {
        const selectedRecipe = favorites[favoriteIndex];

        localStorage.setItem('selectedRecipe', JSON.stringify(selectedRecipe));

        window.location.href = 'recipe.html';
    }
}

function removeFavorite(favoriteIndex) {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    
    if (favorites[favoriteIndex]) {
        favorites.splice(favoriteIndex, 1);

        localStorage.setItem('favorites', JSON.stringify(favorites));

        loadFavorites();
    }
}
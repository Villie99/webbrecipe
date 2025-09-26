function addToFavorites() {
    const selectedRecipe = localStorage.getItem('selectedRecipe');
    if (selectedRecipe) {
        const recipe = JSON.parse(selectedRecipe);
        
        let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        
        const isAlreadyFavorite = favorites.some(fav => fav.name === recipe.name);
        
        const favoriteButton = document.getElementById('add-favorite-btn');
        
        if (!isAlreadyFavorite) {
            favorites.push(recipe);
            localStorage.setItem('favorites', JSON.stringify(favorites));
            
            favoriteButton.textContent = '✓ Tillagd i favoriter';
            favoriteButton.style.backgroundColor = '#28a745';
            favoriteButton.style.cursor = 'default';
            favoriteButton.disabled = true;
        } else {
            favoriteButton.textContent = '✓ Redan i favoriter';
            favoriteButton.style.backgroundColor = '#6c757d';
            favoriteButton.style.cursor = 'default';
            favoriteButton.disabled = true;
        }
    }
    
}
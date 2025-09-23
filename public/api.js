function recipeSearch(ingredients){
    const ingredientsQuery = ingredients.join('%20');
    const apiUrl = `/api/recipes?q=${ingredientsQuery}`;
    
    return new Promise((resolve, reject) => {
        $.ajax({
            url: apiUrl,
            method: "GET",
            success: function(data){
                console.log("Recipe result", data);
                // The API response from your server is already simplified.
                // It's the `simplifiedRecipes` array that your server's
                // /api/recipes endpoint returns. You can directly resolve with it.
                if (data && data.length > 0) {
                    console.log("Returning", data.length, "recipes");
                    resolve(data);
                } else {
                    console.log("No recipes found");
                    resolve([]);
                }
            },
            error: function(error){
                console.error("API Error:", error);
                reject(error);
            }
        });
    });
}
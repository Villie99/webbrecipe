
function recipeSearch(ingredients){

    const ingredientsQuery = ingredients.join('%20');
    
     const apiUrl = `/api/recipes?q=${ingredientsQuery}`;
    
    return new Promise((resolve, reject) => {
        $.ajax({
            url: apiUrl,
            method: "GET",
            success: function(data){
                console.log("Recipe result", data)
                const recipes = data.hits;
                
                if (recipes && recipes.length > 0) {
                    console.log("Returning", recipes.length, "recipes");
                    resolve(recipes);
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
//DOM variables
const recipeGrid = document.getElementById('grid')


//Affichage recette sous forme de carte
const displayRecipeCard = (data) => {
    let gridContent = ''

    data.forEach( recipe => {
        
        let ingredientListHtml = ''

        recipe.ingredients.forEach( ingredient => ingredientListHtml += `<li class="recipe-ingredient"><span class="recipe-ingredient__name">${ingredient.ingredient}</span>: ${ingredient.quantity ? ingredient.quantity : ''}${ingredient.unit ? ingredient.unit : ''}`)
        
        return gridContent += `<article data-id="${recipe.id}" class="recipe-card">
                                    <div class="recipe-card__img-container"></div>
                                    <div class="recipe-card__text-container">
                                        <h2 class="recipe-title">${recipe.name}</h2>
                                        <div class="recipe-time"><i class="fa-solid fa-clock-rotate-left"></i> ${recipe.time} min</div>
                                        <div class="recipe-ingredients">
                                            <ul>
                                                ${ingredientListHtml}
                                            </u>
                                        </div>
                                        <p class="recipe-description">${recipe.description}</p>
                                    </div>
                                </article>`
})

    recipeGrid.innerHTML = gridContent
}

export default displayRecipeCard
import apiManager from '../models/apiManager.js'
import displayRecipeCard from '../utils/displayRecipeCard.js'

//DOM variables
const searchTerm = document.getElementById('search')

//Initialisation des recettes
apiManager.getData()

//Affichage des recettes
displayRecipeCard(apiManager.data)


function handleInputChange(e){
    if (e.target.value.length > 2){
        let filteredData = filterRecipes(e.target.value.toLocaleLowerCase())
        displayRecipeCard(filteredData)
    } else {
        displayRecipeCard(apiManager.data)
    }
}


//Gestion input event de la search bar
function filterRecipes(term) {
    
        return apiManager.data.filter( recipe => recipe.name.toLowerCase().includes(term) || 
        recipe.description.toLowerCase().includes(term) ||
        recipe.ingredients.some( ingredient => ingredient.ingredient.includes(term)))
}

searchTerm.addEventListener('input', handleInputChange)

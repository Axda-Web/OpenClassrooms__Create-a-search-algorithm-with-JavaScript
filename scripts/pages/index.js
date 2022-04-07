import apiManager from '../models/apiManager.js'
import displayRecipeCard from '../utils/displayRecipeCard.js'

//DOM variables
const searchTerm = document.getElementById('search')

//Initialisation des recettes
apiManager.init()

//Affichage des recettes
displayRecipeCard(apiManager.data)


//Gestion input events de la search bar
function handleInputChange(e) {
    if (e.target.value.length > 2){
        const filteredData = apiManager.data.filter( recipe => recipe.name.toLowerCase().includes(e.target.value.toLowerCase()))
        displayRecipeCard(filteredData)
    } else {
        displayRecipeCard(apiManager.data)
    }  
}

searchTerm.addEventListener('input', handleInputChange)

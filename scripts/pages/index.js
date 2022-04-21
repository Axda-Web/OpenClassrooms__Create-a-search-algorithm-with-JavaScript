import apiManager from '../models/apiManager.js'
import displayRecipeCard from '../utils/displayRecipeCard.js'
import { displayFilterListItems, showFilterList, closeFilterList, closeFilterListWithExternalClick, displaySelectedItemsBadge } from '../utils/filterList.js'

//DOM variables
const searchTerm = document.getElementById('search')
const noResultsText = document.querySelector('.no-results-text')
const filterBtns = document.querySelectorAll('.filter-btn-toggle')
const ingredientsFilterList = document.querySelector('.filter-list--ingredients')
const appliancesFilterList = document.querySelector('.filter-list--appliances')
const ustensilsFilterList = document.querySelector('.filter-list--ustensils')
const filterInputBtns = document.querySelectorAll('.filter-input__btn')




//Initialisation des data
apiManager.getData()
apiManager.getIngredients()
apiManager.getAppliances()
apiManager.getUstensils()

ingredientsFilterList.innerHTML = displayFilterListItems(apiManager.ingredients)
appliancesFilterList.innerHTML = displayFilterListItems(apiManager.appliances)
ustensilsFilterList.innerHTML = displayFilterListItems(apiManager.ustensils)


//Affichage des recettes
displayRecipeCard(apiManager.data)



function handleInputChange(e){
    if (e.target.value.length > 2){

        //Récupération des data filtrées
        apiManager.filterData(e.target.value.toLocaleLowerCase())

        //Affichage du message d'erreur en fonction des résultats de la recherche
        !apiManager.filteredData.length ? noResultsText.style.display = 'block' : noResultsText.style.display = ''

        //Affichage des data filtrées
        displayRecipeCard(apiManager.filteredData)    
    } else {

        //Masquage du message d'erreur
        noResultsText.style.display = ''

        //Affichage des data non-filtrées
        displayRecipeCard(apiManager.data)
    }
}
searchTerm.addEventListener('input', handleInputChange)



//Gestion du click event sur les btn permetant d'afficher les menu filtres avancés
filterBtns.forEach( btn => btn.addEventListener('click', showFilterList)) 

//Gestion du click event sur les btn permetant de masquer les menu filtres avancés
filterInputBtns.forEach( btn => btn.addEventListener('click', closeFilterList))

const filterListItems = document.querySelectorAll('.filter-list__item')
filterListItems.forEach( item => item.addEventListener('click', displaySelectedItemsBadge))

//Gestion du click event sur la page permetant de masquer les menu filtres avancés (si besoin)
document.body.addEventListener('click', closeFilterListWithExternalClick)


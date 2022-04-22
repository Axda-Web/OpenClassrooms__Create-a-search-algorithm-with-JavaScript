import dataManager from '../models/dataManager.js'
import displayRecipeCard from '../utils/displayRecipeCard.js'
import { displayFilterListItems, showFilterList, closeFilterList, addBadge } from '../utils/filterList.js'

//DOM variables
const searchTerm = document.getElementById('search')
const noResultsText = document.querySelector('.no-results-text')
const filterBtns = document.querySelectorAll('.filter-btn-toggle')
const ingredientsFilterList = document.querySelector('.filter-list--ingredients')
const appliancesFilterList = document.querySelector('.filter-list--appliances')
const ustensilsFilterList = document.querySelector('.filter-list--ustensils')
const filterInputBtns = document.querySelectorAll('.filter-input__btn')



//Initialisation des data
dataManager.getData()
dataManager.getIngredients()
dataManager.getAppliances()
dataManager.getUstensils()
dataManager.setBadgeItems()


ingredientsFilterList.innerHTML = displayFilterListItems(dataManager.ingredients)
appliancesFilterList.innerHTML = displayFilterListItems(dataManager.appliances)
ustensilsFilterList.innerHTML = displayFilterListItems(dataManager.ustensils)


//Affichage des recettes
displayRecipeCard(dataManager.data)



function handleInputChange(e){
    if (e.target.value.length > 2){

        //Récupération des data filtrées
        dataManager.filterData(e.target.value.toLocaleLowerCase())

        //Affichage du message d'erreur en fonction des résultats de la recherche
        !dataManager.filteredData.length ? noResultsText.style.display = 'block' : noResultsText.style.display = ''

        //Affichage des data filtrées
        displayRecipeCard(dataManager.filteredData)    
    } else {

        //Masquage du message d'erreur
        noResultsText.style.display = ''

        //Affichage des data non-filtrées
        displayRecipeCard(dataManager.data)
    }
}
searchTerm.addEventListener('input', handleInputChange)



//Gestion du click event sur les btn permetant d'afficher les menu filtres avancés
filterBtns.forEach( btn => btn.addEventListener('click', showFilterList)) 

//Gestion du click event sur les btn permetant de masquer les menu filtres avancés
filterInputBtns.forEach( btn => btn.addEventListener('click', closeFilterList))

//Gestion du click event sur les filter items permettant d'afficher les badges
const filterListItems = document.querySelectorAll('.filter-list__item')
filterListItems.forEach( item => item.addEventListener('click', addBadge))


import apiManager from '../models/apiManager.js'
import displayRecipeCard from '../utils/displayRecipeCard.js'
import { displayFilterListItems, showFilterList, closeFilterList, closeFilterListWithExternalClick } from '../utils/filterList.js'

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



function handleFilterBtnClick(event) {

    switch(event.currentTarget.id){
        case 'ingredientsBtn':
            ingredientsFilterList.innerHTML = displayFilterListItems(apiManager.ingredients)
            break
        
        case 'appliancesBtn':
            appliancesFilterList.innerHTML = displayFilterListItems(apiManager.appliances)
            break

        case 'ustensilsBtn':
            ustensilsFilterList.innerHTML = displayFilterListItems(apiManager.ustensils)
            break
    } 

    showFilterList(event.currentTarget)
}
filterBtns.forEach( btn => btn.addEventListener('click', handleFilterBtnClick)) 

filterInputBtns.forEach( btn => btn.addEventListener('click', closeFilterList))

//F
document.body.addEventListener('click', closeFilterListWithExternalClick)


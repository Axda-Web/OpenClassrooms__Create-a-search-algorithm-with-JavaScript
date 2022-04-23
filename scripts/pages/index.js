import dataManager from '../models/dataManager.js'
import displayRecipeCard from '../utils/displayRecipeCard.js'
import { showFilterList, closeFilterList, updateFilterListData } from '../utils/filterList.js'


//DOM variables
const searchTerm = document.getElementById('search')
const noResultsText = document.querySelector('.no-results-text')
const filterBtns = document.querySelectorAll('.filter-btn-toggle')
const filterInputBtns = document.querySelectorAll('.filter-input__btn')



//Initialisation des data
dataManager.getData()
dataManager.setBadgeItems()

//MAJ des datas filtres avancés
updateFilterListData()


//Affichage des recettes
displayRecipeCard(dataManager.data)



function handleInputChange(event){
    if (event.target.value.length > 2){

        //Récupération des data filtrées
        dataManager.filterData(event.target.value.toLocaleLowerCase())

        //Affichage du message d'erreur en fonction des résultats de la recherche
        !dataManager.filteredData.length ? noResultsText.style.display = 'block' : noResultsText.style.display = ''

        //Affichage des data filtrées
        displayRecipeCard(dataManager.filteredData)
        
        updateFilterListData()

    } else {

        //Masquage du message d'erreur
        noResultsText.style.display = ''

        //Affichage des data non-filtrées
        displayRecipeCard(dataManager.data)
        dataManager.filteredData = dataManager.data
    }
}
searchTerm.addEventListener('input', handleInputChange)



//Gestion du click event sur les btn permetant d'afficher les menu filtres avancés
filterBtns.forEach( btn => btn.addEventListener('click', showFilterList)) 

//Gestion du click event sur les btn permetant de masquer les menu filtres avancés
filterInputBtns.forEach( btn => btn.addEventListener('click', closeFilterList))



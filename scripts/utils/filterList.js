import dataManager from "../models/dataManager.js"
import displayRecipeCard from "./displayRecipeCard.js"

//DOM variables
const filterBtns = document.querySelectorAll('.filter-btn-toggle')
const filterInputs = document.querySelectorAll('.filter-input')
const filterLists = document.querySelectorAll('.filter-list')
const badgesContainer = document.querySelector('.badges-container')
const recipesGrid = document.getElementById('grid')
const ingredientsFilterList = document.querySelector('.filter-list--ingredients')
const appliancesFilterList = document.querySelector('.filter-list--appliances')
const ustensilsFilterList = document.querySelector('.filter-list--ustensils')
const noResultsText = document.querySelector('.no-results-text')



//Génération id aléatoire pour les items contenus dans les listes filtres avancés
const generateRandomId = () => {
    const prevIds = []
    const newId = Math.floor(Math.random() * 1001)

    if(!prevIds.find( id => id === newId)) {
        prevIds.push(newId)
        return newId.toString()
    }
}



//Formatage HTML des éléments contenus dans les data filtres avancés
export const displayFilterListItems = data => {
    let filterListHtml = ''

    if (data.length > 0) {
        data.forEach( item => filterListHtml += `<li data-item_id="${generateRandomId()}" tabindex="0" id="filter--${item.split(' ').join('_')}" class="filter-list__item" role="option" aria-selected="false" >${item}</li>`)
    } else {
        filterListHtml = '<li tabindex="0" class="filter-list__item filter-list__item--empty" role="option" aria-selected="false" >Pas de résultat pour cette recherche...</li>'
    }

    return filterListHtml
}



//Ajout badge
export const addBadge = event => {

    //Accessibility
    event.target.setAttribute('aria-selected', 'true')
    event.target.parentNode.setAttribute('aria-activedescendant', event.target.id)

    //Création d'un nouvel obj badge content grâce aux infos fournies par le click event
    const newBadge = {
        id: event.target.dataset.item_id,
        name: event.target.textContent,
        category: event.target.parentNode.id
    }

    //Vérification que le badge n'existe pas déjà
    if (dataManager.badgeItems.find( badge => badge.name === newBadge.name)) {
        return
    } else {
        dataManager.badgeItems = [...dataManager.badgeItems, newBadge]
    }

    //MAJ des data affichées en fonction des badges actifs
    dataManager.filterWithBadges()
    !dataManager.filteredData.length ? noResultsText.style.display = 'block' : noResultsText.style.display = ''
    displayRecipeCard(dataManager.filteredData)
    updateFilterListData()
    
    //Affichage du badge
    displayBadges()

    //Reset de l'input text dans les menus filter avancés
    filterInputs.forEach( input => input.childNodes[1].value = '')
}



//Affichage des badges
const displayBadges = () => {

    //Ajustement du layout en fonction de la présence (ou non) de badges
    if(dataManager.badgeItems.length > 0) {
        recipesGrid.style.top = '320px'
        badgesContainer.style.display = 'flex'
    } else {
        recipesGrid.style.top = '270px'
        badgesContainer.style.display = 'none'
    }


    //Génération HTML
    let badgeHtml = ''

    dataManager.badgeItems.map( item => {
        switch(item.category){
            case 'ingredients-filter-list':
                badgeHtml += `<div data-badge_id="${item.id}"class="badge badge--ingredient">${item.name} <span class="far fa-times-circle badge__icon"></span></div>`
                break
            case 'appliances-filter-list':
                badgeHtml += `<div data-badge_id="${item.id}"class="badge badge--appliance">${item.name} <span class="far fa-times-circle badge__icon"></span></div>`
                break
            case 'ustensils-filter-list':
                badgeHtml += `<div data-badge_id="${item.id}"class="badge badge--ustensil">${item.name} <span class="far fa-times-circle badge__icon"></span></div>`
                break
        }
    })


    //Insertion HTML
    badgesContainer.innerHTML = badgeHtml

    //Gestion du click event sur les close icons permettant de supprimer les badges
    const badgeCloseIcons = document.querySelectorAll('.badge__icon')
    badgeCloseIcons.forEach( item => item.addEventListener('click', removeBadge))
}



//Fermeture badge
export const removeBadge = event => {

     /* //Accessibility
    const elt = document.querySelector(`[data-item_id="${event.target.parentNode.dataset.badge_id}"]`)
    elt.setAttribute('aria-selected', 'false')

    switch (elt.parentNode.id) {
        case 'ingredients-filter-list':
            const eltsIngredientCategory = dataManager.badgeItems.filter( item => item.category === 'ingredients-filter-list')
            const lastIngredientElt = document.querySelector(`[data-item_id="${eltsIngredientCategory[eltsIngredientCategory.length - 1].id}"]`)
            if(eltsIngredientCategory.length > 0) {
                elt.parentNode.setAttribute('aria-activedescendant', lastIngredientElt.id)
            } else {
                elt.parentNode.setAttribute('aria-activedescendant', '')
            }
            break
        case 'appliances-filter-list':
            const eltsApplianceCategory = dataManager.badgeItems.filter( item => item.category === 'appliances-filter-list')
            const lastApplianceElt = document.querySelector(`[data-item_id="${eltsApplianceCategory[eltsApplianceCategory.length - 1].id}"]`)
            if(eltsApplianceCategory.length > 0) {
                elt.parentNode.setAttribute('aria-activedescendant', lastApplianceElt.id)
            } else {
                elt.parentNode.setAttribute('aria-activedescendant', '')
            }
            break
        case 'ustensils-filter-list':
            const eltsUstensilCategory = dataManager.badgeItems.filter( item => item.category === 'ustensils-filter-list')
            const lastUstensilElt = document.querySelector(`[data-item_id="${eltsUstensilCategory[eltsUstensilCategory.length - 1].id}"]`)
            if(eltsUstensilCategory.length > 0) {
                elt.parentNode.setAttribute('aria-activedescendant', lastUstensilElt.id)
            } else {
                elt.parentNode.setAttribute('aria-activedescendant', '')
            }
            break
    } */



    //Suppression du badge selectionné dans l'array contenant les badges
    dataManager.badgeItems = dataManager.badgeItems.filter( badge => badge.id !== event.target.parentNode.dataset.badge_id)

    
    //MAJ des data
    if (dataManager.badgeItems.length === 0) {
        noResultsText.style.display = ''
        updateFilterListData()
        displayRecipeCard(dataManager.filteredWithSearchbar)
    }

    dataManager.filteredData = dataManager.filteredWithSearchbar
    dataManager.filterWithBadges()
    updateFilterListData()
    displayRecipeCard(dataManager.filteredData)

    //MAJ de l'UI sans le badge supprimé
    displayBadges()
}



//Fermeture des dropdown menu filtres avancés
export const closeFilterList = event => {

    //Affichage des btn permettant d'afficher les menus filtres avancés
    filterBtns.forEach( btn => {
        
        //Accessibilité
        btn.setAttribute('aria-expanded', 'false')
        btn.setAttribute('aria-hidden', 'false')

        btn.style.display = 'block'
    })


    //Masquage des menus filtres avancés
    filterInputs.forEach( input => {

        //Accessibilité
        input.setAttribute('aria-hidden', 'true')

        input.style.display = 'none'
    })

    filterLists.forEach( list => list.style.display = 'none')

    
    
    //Reset des éléments présents dans les menus filter avancés
    filterInputs.forEach( input => input.childNodes[1].value = '')
    updateFilterListData()

    //Suppresion de la gestion du click event sur la page permetant de masquer les menu filtres avancés
    document.body.removeEventListener('click', closeFilterListWithExternalClick)
}



//Fermeture des dropdown menu filtres avancés lors d'un click externe (ajout des exeptions pour certains éléments)
export const closeFilterListWithExternalClick = event => {

    if (event.target.className === 'filter-list__item') {
        return
    }

    if (event.target.parentNode.dataset.badge_id) {
        return
    }

    switch (event.target.id) {
        case 'ingredientsBtn':
            break
        case 'appliancesBtn':
            break
        case 'ustensilsBtn':
            break
        case 'filter-input-ingredients':
            break
        case 'filter-input-appliances':
            break
        case 'filter-input-ustensils':
            break
        default:
            closeFilterList()
    }
}



//Recherche dans les filtres avancés
const advancedFilterSearch = (event) => {

    if (event.target.value.length > 2){

        switch(event.target.id){
            case 'filter-input-ingredients':
                dataManager.filterIngredients(event.target.value.toLocaleLowerCase())
                ingredientsFilterList.innerHTML = displayFilterListItems(dataManager.filteredIngredients)
                break
            case 'filter-input-appliances':
                dataManager.filterAppliances(event.target.value.toLocaleLowerCase())
                appliancesFilterList.innerHTML = displayFilterListItems(dataManager.filteredAppliances)
                break
            case 'filter-input-ustensils':
                dataManager.filterUstensils(event.target.value.toLocaleLowerCase())
                ustensilsFilterList.innerHTML = displayFilterListItems(dataManager.filteredUstensils)
                break
        }

        const filterListItems = document.querySelectorAll('.filter-list__item')
        filterListItems.forEach( item => item.addEventListener('click', addBadge))

    } else {
        updateFilterListData()
    }
}



//Ouverture des menus filtres avancés
export const showFilterList = event => {

        //Fermeture du dropdown menu actuellement ouvert (si besoin)
        closeFilterList()

        //DOM variables
        const currentFilterBtnToggle = event.currentTarget
        const currentFilterInput = currentFilterBtnToggle.nextElementSibling
        const currentFilterList = currentFilterInput.nextElementSibling

        //Accessibilité
        currentFilterBtnToggle.setAttribute('aria-expanded', 'true')
        currentFilterBtnToggle.setAttribute('aria-hidden', 'true')
        currentFilterInput.setAttribute('aria-hidden', 'false')

        //Affichage du dropdown menu associé au btn clické
        currentFilterBtnToggle.style.display = 'none'
        currentFilterInput.style.display = 'flex'
        currentFilterList.style.display = 'grid'

        //Gestion de l'input event afin d'effectuer une recherche dans les filtres avancés
        currentFilterInput.addEventListener('input', advancedFilterSearch)

        //Gestion du click event sur la page permetant de masquer les menu filtres avancés
        document.body.addEventListener('click', closeFilterListWithExternalClick)
}



//MAJ des data contenus dans les filtres avancés après recherche effectuée dans la barre de recherche
export const updateFilterListData = () => {

    //Récupération des data
    dataManager.getIngredients()
    dataManager.getAppliances()
    dataManager.getUstensils()

    //Génération + insertion du HTML 
    ingredientsFilterList.innerHTML = displayFilterListItems(dataManager.ingredients)
    appliancesFilterList.innerHTML = displayFilterListItems(dataManager.appliances)
    ustensilsFilterList.innerHTML = displayFilterListItems(dataManager.ustensils)

    //Gestion du click event sur les filter items permettant d'afficher les badges
    const filterListItems = document.querySelectorAll('.filter-list__item')
    filterListItems.forEach( item => item.addEventListener('click', addBadge))
}



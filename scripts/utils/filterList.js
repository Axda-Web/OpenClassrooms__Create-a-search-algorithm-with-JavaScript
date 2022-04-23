import dataManager from "../models/dataManager.js"

//DOM variables
const filterBtns = document.querySelectorAll('.filter-btn-toggle')
const filterInputs = document.querySelectorAll('.filter-input')
const filterLists = document.querySelectorAll('.filter-list')
const badgesContainer = document.querySelector('.badges-container')
const recipesGrid = document.getElementById('grid')

const ingredientsFilterList = document.querySelector('.filter-list--ingredients')
const appliancesFilterList = document.querySelector('.filter-list--appliances')
const ustensilsFilterList = document.querySelector('.filter-list--ustensils')



//Génération id aléatoire pour les items contenus dans les listes filtres avancés
const generateRandomId = () => {
    const prevIds = []
    const newId = Math.floor(Math.random() * 101)

    if(!prevIds.find( id => id === newId)) {
        prevIds.push(newId)
        return newId.toString()
    }
}



//Formatage HTML des éléments contenus dans les data filtres avancés
export const displayFilterListItems = data => {
    let filterListHtml = ''
    data.forEach( item => filterListHtml += `<li data-item_id="${generateRandomId()}" tabindex="0" id="filter--${item.split(' ').join('_')}" class="filter-list__item" role="option" aria-selected="false" >${item}</li>`)
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
    
    //Affichage du badge
    displayBadges()
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
                badgeHtml += `<div data-badge_id="${item.id}"class="badge badge--ingredient">${item.name} <span class="fa-solid fa-circle-xmark badge__icon"></span></div>`
                break
            case 'appliances-filter-list':
                badgeHtml += `<div data-badge_id="${item.id}"class="badge badge--appliance">${item.name} <span class="fa-solid fa-circle-xmark badge__icon"></span></div>`
                break
            case 'ustensils-filter-list':
                badgeHtml += `<div data-badge_id="${item.id}"class="badge badge--ustensil">${item.name} <span class="fa-solid fa-circle-xmark badge__icon"></span></div>`
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

    //MAJ de l'UI sans le badge supprimé
    displayBadges()
}



//Fermeture des dropdown menu filtres avancés
export const closeFilterList = event => {

    filterBtns.forEach( btn => {
        
        //Accessibilité
        btn.setAttribute('aria-expanded', 'false')
        btn.setAttribute('aria-hidden', 'false')

        btn.style.display = 'block'
    })

    filterInputs.forEach( input => {

        //Accessibilité
        input.setAttribute('aria-hidden', 'true')

        input.style.display = 'none'
    })

    filterLists.forEach( list => list.style.display = 'none')

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
        case 'filter':
            break
        default:
            closeFilterList()
    }
}



//Ouverture des menus filtres avancés
export const showFilterList = event => {

        //DOM variables
        const currentFilterBtnToggle = event.currentTarget
        const currentFilterInput = currentFilterBtnToggle.nextElementSibling
        const currentFilterList = currentFilterInput.nextElementSibling

        //Fermeture du dropdown menu actuellement ouvert (si besoin)
        closeFilterList()

        //Accessibilité
        currentFilterBtnToggle.setAttribute('aria-expanded', 'true')
        currentFilterBtnToggle.setAttribute('aria-hidden', 'true')
        currentFilterInput.setAttribute('aria-hidden', 'false')

        //Affichage du dropdown menu associé au btn clické
        currentFilterBtnToggle.style.display = 'none'
        currentFilterInput.style.display = 'flex'
        currentFilterList.style.display = 'grid'

        //Gestion du click event sur la page permetant de masquer les menu filtres avancés
        document.body.addEventListener('click', closeFilterListWithExternalClick)
}



//MAJ des data contenus dans les filtres avancés après recherche effectuée dans la barre de recherche
export const updateFilterListData = () => {
    dataManager.getIngredients()
    dataManager.getAppliances()
    dataManager.getUstensils()

    ingredientsFilterList.innerHTML = displayFilterListItems(dataManager.ingredients)
    appliancesFilterList.innerHTML = displayFilterListItems(dataManager.appliances)
    ustensilsFilterList.innerHTML = displayFilterListItems(dataManager.ustensils)

    //Gestion du click event sur les filter items permettant d'afficher les badges
    const filterListItems = document.querySelectorAll('.filter-list__item')
    filterListItems.forEach( item => item.addEventListener('click', addBadge))
}



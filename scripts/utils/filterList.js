import dataManager from "../models/dataManager.js"

//DOM variables
const filterBtn = document.querySelectorAll('.filter-btn-toggle')
const filterInput = document.querySelectorAll('.filter-input')
const filterList = document.querySelectorAll('.filter-list')
const badgesContainer = document.querySelector('.badges-container')
const recipesGrid = document.getElementById('grid') 


//Formatage HTML des éléments contenus dans les data filtres avancés
export const displayFilterListItems = data => {
    let filterListHtml = ''
    data.forEach( item => filterListHtml += `<li id="filter--${item.split(' ').join('_')}" class="filter-list__item" role="option" aria-selected="false" >${item}</li>`)
    return filterListHtml
}


//Ajout badge
export const addBadge = event => {

    const newBadge = {
        id: generateRandomId(),
        name: event.target.textContent,
        category: event.target.parentNode.id
    }

    if (dataManager.badgeItems.find( badge => badge.name === newBadge.name)) {
        return
    } else {
        dataManager.badgeItems = [...dataManager.badgeItems, newBadge]
    }
    
    displayBadges()
}


//Génération id aléatoire pour les badges
const generateRandomId = () => {
    const prevIds = []
    const newId = Math.floor(Math.random() * 101)

    if(!prevIds.find( id => id === newId)) {
        prevIds.push(newId)
        return newId.toString()
    }
}


//Affichage des badges
const displayBadges = () => {

    if(dataManager.badgeItems.length > 0) {
        recipesGrid.style.top = '320px'
        badgesContainer.style.display = 'flex'
    } else {
        recipesGrid.style.top = '270px'
        badgesContainer.style.display = 'none'
    }

    let badgeHtml = ''

    dataManager.badgeItems.map( item => {
        switch(item.category){
            case 'ingredients-filter-list':
                badgeHtml += `<div data-id="${item.id}"class="badge badge--ingredient">${item.name} <span class="fa-solid fa-circle-xmark badge__icon"></span></div>`
                break
            case 'appliances-filter-list':
                badgeHtml += `<div data-id="${item.id}"class="badge badge--appliance">${item.name} <span class="fa-solid fa-circle-xmark badge__icon"></span></div>`
                break
            case 'ustensils-filter-list':
                badgeHtml += `<div data-id="${item.id}"class="badge badge--ustensil">${item.name} <span class="fa-solid fa-circle-xmark badge__icon"></span></div>`
                break
        }
    })

    badgesContainer.innerHTML = badgeHtml

    //Gestion du click event sur les close icons permettant de supprimer les badges
    const badgeCloseIcons = document.querySelectorAll('.badge__icon')
    badgeCloseIcons.forEach( item => item.addEventListener('click', removeBadge))
}


//Fermeture badge
export const removeBadge = event => {
    dataManager.badgeItems = dataManager.badgeItems.filter( badge => badge.id !== event.target.parentNode.dataset.id)
    displayBadges()
}


//Fermeture des dropdown menu filtres avancés
export const closeFilterList = event => {

    filterBtn.forEach( btn => {
        
        //Accessibilité
        btn.setAttribute('aria-expanded', 'false')
        btn.setAttribute('aria-hidden', 'false')

        btn.style.display = 'block'
    })

    filterInput.forEach( input => {

        //Accessibilité
        input.setAttribute('aria-hidden', 'true')

        input.style.display = 'none'
    })

    filterList.forEach( list => list.style.display = 'none')

    //Suppresion de la gestion du click event sur la page permetant de masquer les menu filtres avancés
    document.body.removeEventListener('click', closeFilterListWithExternalClick)
}


//Fermeture des dropdown menu filtres avancés lors d'un click externe
export const closeFilterListWithExternalClick = event => {

    if(event.target.className === 'filter-list__item'){
        return
    }

    switch(event.target.id){
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
        currentFilterInput.style.display = 'block'
        currentFilterList.style.display = 'grid'

        //Gestion du click event sur la page permetant de masquer les menu filtres avancés
        document.body.addEventListener('click', closeFilterListWithExternalClick)
}



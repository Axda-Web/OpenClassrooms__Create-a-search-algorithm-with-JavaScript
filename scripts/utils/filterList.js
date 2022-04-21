//DOM variables
const filterBtn = document.querySelectorAll('.filter-btn-toggle')
const filterInput = document.querySelectorAll('.filter-input')
const filterList = document.querySelectorAll('.filter-list')
const badgesContainer = document.querySelector('.badges-container')


//Formatage HTML des éléments contenus dans les data filtres avancés
export const displayFilterListItems = data => {
    let filterListHtml = ''
    data.forEach( item => filterListHtml += `<li id="filter--${item}" class="filter-list__item" role="option" aria-selected="false" >${item}</li>`)
    return filterListHtml
}

export const displaySelectedItemsBadge = event => {
    switch(event.target.parentNode.id){
        case 'ingredients-filter-list':
            badgesContainer.innerHTML += `<div class="badge badge--ingredient">${event.target.textContent} <span class="fa-solid fa-circle-xmark badge__icon"></span></div>`
            break

        case 'appliances-filter-list':
            badgesContainer.innerHTML += `<div class="badge badge--appliance">${event.target.textContent} <span class="fa-solid fa-circle-xmark badge__icon"></span></div>`
            break

        case 'ustensils-filter-list':
            badgesContainer.innerHTML += `<div class="badge badge--ustensil">${event.target.textContent} <span class="fa-solid fa-circle-xmark badge__icon"></ispan</div>`
            break
    }
    
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
}



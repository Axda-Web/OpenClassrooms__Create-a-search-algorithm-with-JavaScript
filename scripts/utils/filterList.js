//DOM variables
const filterBtn = document.querySelectorAll('.filter-btn-toggle')
const filterInput = document.querySelectorAll('.filter-input')
const filterList = document.querySelectorAll('.filter-list')


//Formatage HTML des éléments contenus dans les data filtres avancés
export const displayFilterListItems = (data) => {
    let filterListHtml = ''
    data.forEach( item => filterListHtml += `<li id="filter--${item}" class="filter-list__item" role="option" aria-selected="false" >${item}</li>`)
    return filterListHtml
}


//Fermeture des dropdown menu filtres avancés
export const closeFilterList = (event) => {
    filterBtn.forEach( btn => btn.style.display = 'block')
    filterInput.forEach( input => input.style.display = 'none') 
    filterList.forEach( list => list.style.display = 'none') 
}


//Ouverture des menus filtres avancés
export const showFilterList = (target) => {

        //DOM variables
        const currentFilterBtnToggle = target
        const currentFilterInput = currentFilterBtnToggle.nextElementSibling
        const currentFilterList = currentFilterInput.nextElementSibling

        //Fermeture du dropdown menu actuellement ouvert (si besoin)
        closeFilterList()

        //Affichage du dropdown menu associé au btn clické
        currentFilterBtnToggle.style.display = 'none'
        currentFilterInput.style.display = 'block'
        currentFilterList.style.display = 'grid'
}



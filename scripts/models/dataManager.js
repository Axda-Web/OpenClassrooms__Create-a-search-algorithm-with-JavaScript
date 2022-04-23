import recipes from "../../data/recipes.js"


export default class dataManager {
    
    static getData() {
        this.data = recipes
        this.filteredData = recipes
    }

    static getIngredients() {
        const duplicatesIngredients = this.filteredData.map( recipe => recipe.ingredients ).flat().map( item => item['ingredient'])
        this.ingredients = [...new Set(duplicatesIngredients)]
        this.filteredIngredients = this.ingredients
    }

    static getAppliances() {
        const duplicatesAppliances = this.filteredData.map( recipe => recipe.appliance )
        this.appliances = [...new Set(duplicatesAppliances)]
        this.filteredAppliances = this.appliances
    }

    static getUstensils() {
        const duplicatesUstensils = this.filteredData.map( recipe => recipe.ustensils ).flat()
        this.ustensils = [...new Set(duplicatesUstensils)]
        this.filteredUstensils = this.ustensils
    }

    static setBadgeItems() {
        this.badgeItems = []
    }

    static filterData(term) {
        this.filteredData = this.data.filter( recipe => recipe.name.toLowerCase().includes(term) || 
        recipe.description.toLowerCase().includes(term) ||
        recipe.ingredients.some( ingredient => ingredient.ingredient.includes(term)))
    }
    
    static filterIngredients(term) {
        this.filteredIngredients = this.ingredients.filter( ingredient => ingredient.toLowerCase().includes(term))
    }

    static filterAppliances(term) {
        this.filteredAppliances = this.appliances.filter( appliance => appliance.toLowerCase().includes(term))
    }

    static filterUstensils(term) {
        this.filteredUstensils = this.ustensils.filter( ustensil => ustensil.toLowerCase().includes(term))
    }
}


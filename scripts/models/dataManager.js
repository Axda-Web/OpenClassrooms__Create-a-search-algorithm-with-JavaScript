import recipes from "../../data/recipes.js"


export default class dataManager {
    
    static getData() {
        this.data = recipes
        this.filteredData = recipes
    }

    static getIngredients() {
        const duplicatesIngredients = this.filteredData.map( recipe => recipe.ingredients ).flat().map( item => item['ingredient'])
        this.ingredients = [...new Set(duplicatesIngredients)]
    }

    static getAppliances() {
        const duplicatesAppliances = this.filteredData.map( recipe => recipe.appliance )
        this.appliances = [...new Set(duplicatesAppliances)]
    }

    static getUstensils() {
        const duplicatesUstensils = this.filteredData.map( recipe => recipe.ustensils ).flat()
        this.ustensils = [...new Set(duplicatesUstensils)]
    }

    static setBadgeItems() {
        this.badgeItems = []
    }

    static filterData(term) {
        this.filteredData = this.data.filter( recipe => recipe.name.toLowerCase().includes(term) || 
        recipe.description.toLowerCase().includes(term) ||
        recipe.ingredients.some( ingredient => ingredient.ingredient.includes(term)))
    } 
}

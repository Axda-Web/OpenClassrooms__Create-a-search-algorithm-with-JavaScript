import recipes from "../../data/recipes.js"


export default class apiManager {
    constructor(){
        this.data = []
        this.allingredients = []
        this.allustensils = []
    }
    
    static async getData() {
        this.data = recipes
    }
}
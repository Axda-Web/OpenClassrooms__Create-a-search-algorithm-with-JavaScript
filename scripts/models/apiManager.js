import recipes from "../../data/recipes.js"


export default class apiManager {
    constructor(){
        this.data = []
    }
    
    static init() {
        this.data = recipes
    }
}
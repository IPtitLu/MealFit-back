import { IRecipe, Recipe } from '../models/Recipe';
import SpoonacularService from './spoonacular.service';

class RecipeService {
    protected externalApi: SpoonacularService;

    constructor() {
        this.externalApi = new SpoonacularService();

    }

    async getRecipesByIngredients(ingredients: string[]): Promise<IRecipe[]> {
        try {
            const recipes = await this.externalApi.findRecipesByIngredients(ingredients);
            return recipes;
        } catch (error) {
            throw error;
        }
    }

    async getRecipeDetails(recipeId: number): Promise<IRecipe> {
        try {
            const recipe = await this.externalApi.getRecipeDetails(recipeId);
            return recipe;
        } catch (error) {
            throw error;
        }
    }
}

export default RecipeService;
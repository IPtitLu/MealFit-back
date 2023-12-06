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

    convertToObject(recipe: any): IRecipe {
        return {
            title: recipe.title,
            summary: recipe.summary,
            servingSize: recipe.servings,
            cookingMinutes: recipe.cookingMinutes,
            image: recipe.image,
            ingredients: recipe.extendedIngredients.map((ingredient) => ({
                ingredient: ingredient.id,
                quantity: ingredient.amount,
                unit: ingredient.unit,
            })),
            instructions: recipe.instructions,
            suitableFor: Object.keys(recipe)
                .filter((key) => ['vegetarian', 'vegan', 'glutenFree', 'dairyFree', 'veryHealthy', 'cheap', 'veryPopular', 'sustainable'].includes(key) && recipe[key])
                .map((key) => key.toLowerCase()),
        };
    }
}

export default RecipeService;
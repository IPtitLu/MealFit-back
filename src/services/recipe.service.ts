import { IRecipe, Recipe } from '../models/Recipe';
import { User } from '../models/User';
import { RecipeQueryFilter } from '../types';
import SpoonacularService from './spoonacular.service';
import { UserService } from './user.service';

class RecipeService {
    protected externalApi: SpoonacularService;
    protected userService: UserService;
    constructor() {
        this.externalApi = new SpoonacularService();
        this.userService = new UserService();
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
            const formatedRecipe = this.convertToObject(recipe);
            return formatedRecipe;
        } catch (error) {
            throw error;
        }
    }

    async getRecipesByQueryAndFilter(query: RecipeQueryFilter): Promise<IRecipe[]> {
        try {
            const recipes = await this.externalApi.findRecipesByQuery(query);
            return recipes;
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
    async addFavoriteRecipe(userId: string, recipeId: string) {
        try {
            const user = await User.findById(userId);
            if (!user) {
                throw new Error('User not found');
            }
            user.favoriteRecipes.push(recipeId);
            await user.save();
            return user;
        } catch (error) {
            throw error;
        }
    }
    async getFavoritesRecipes(userId: string) {

        try {
            const user = await User.findById(userId)
            if (!user) {
                throw new Error('User not found');
            }
            //loop through favoriteRecipes and get the recipe details througn spoonacular
            const favoriteRecipesDetails = await Promise.all(user.favoriteRecipes.map(async (recipeId: any) => {
                const recipe = await this.getRecipeDetails(recipeId);
                return recipe;
            }))
            return favoriteRecipesDetails;
        } catch (error) {
            throw error;
        }
    }
    async removeFavoriteRecipe(userId: string, recipeId: string) {
        try {
            const user = await User.findById(userId);
            if (!user) {
                throw new Error('User not found');
            }
            user.favoriteRecipes = user.favoriteRecipes.filter((recipe: any) => recipe.toString() !== recipeId);
            await user.save();
            return user;
        } catch (error) {
            throw error;
        }
    }
}

export default RecipeService;
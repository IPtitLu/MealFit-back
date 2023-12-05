import { get } from 'http';
import RecipeService from '../services/recipe.service';
import { Request, Response } from 'express';

class RecipeController {
    protected recipeService: RecipeService;

    constructor() {
        this.recipeService = new RecipeService();

    }

    getRecipesByIngredients = async (req: Request, res: Response) => {
        // Extract ingredients from req
        const ingredients: string[] = req.body;

        try {
            // Call RecipeService.getRecipesByIngredients
            const recipes = await this.recipeService.getRecipesByIngredients(ingredients);

            // Return the recipes as a JSON response
            res.json(recipes);
        } catch (error) {
            // Return an error as a JSON response
            res.status(500).json({ error: error.message });
        }
    }

    getRecipeDetails = async (req: Request, res: Response) => {
        // Extract recipeId from req
        const recipeId: number = parseInt(req.params.id);

        try {
            // Call RecipeService.getRecipeDetails
            const recipe = await this.recipeService.getRecipeDetails(recipeId);

            // Return the recipe as a JSON response
            res.json(recipe);
        } catch (error) {
            // Return an error as a JSON response
            res.status(500).json({ error: error.message });
        }
    }
}

export default RecipeController;
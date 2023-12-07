import { get } from 'http';
import RecipeService from '../services/recipe.service';
import { Request, Response } from 'express';
import { AuthRequest } from '../types';
import { UserService } from '../services/user.service';

class RecipeController {
    protected recipeService: RecipeService;
    protected userService: UserService;
    constructor() {
        this.recipeService = new RecipeService();
        this.userService = new UserService();
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

    getRecipesByQuery = async (req: Request, res: Response) => {

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

    addFavoriteRecipe = async (req: AuthRequest, res: Response) => {
        const userId = req.params.userId;
        const recipeId = req.body.recipeId;
        try {
            const user = await this.userService.addFavoriteRecipe(userId, recipeId);
            res.json(user);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

export default RecipeController;
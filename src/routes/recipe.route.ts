import express, { Router } from 'express';
import RecipeController from '../controllers/recipe.controller';

const router: Router = express.Router();
const recipeController = new RecipeController();

router.post('/suggest', recipeController.getRecipesByIngredients);
router.get('/:id', recipeController.getRecipeDetails);
/* router.put('/:id', recipeController.updateRecipe);
router.delete('/:id', recipeController.deleteRecipe);
 */
export default router;
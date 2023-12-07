import express, { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { verifyToken } from '../middlewares/verifyToken';
import RecipeController from '../controllers/recipe.controller';

const router: Router = express.Router();
//load controllers
const userController = new UserController();
const recipeController = new RecipeController();

//user routes
router.post('/register', userController.createUser);
router.post('/login', userController.login);
router.post('/renewtoken', verifyToken, userController.renewToken);
router.get('/me', verifyToken, userController.getMe);
router.get('/:id', verifyToken, userController.getUser);
router.post('/:userId/favorites', verifyToken, recipeController.addFavoriteRecipe);
router.get('/:userId/favorites', verifyToken, recipeController.getFavoritesRecipes);
router.delete('/:userId/favorites/:recipeId', verifyToken, recipeController.removeFavoriteRecipe);
router.put('/:id', verifyToken, userController.updateUser);
router.delete('/:id', verifyToken, userController.deleteUser);

export default router;

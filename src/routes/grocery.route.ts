import express, { Router } from 'express';
import GroceryListController from '../controllers/grocery.controller';
import { verifyToken } from '../middlewares/verifyToken';

const router: Router = express.Router();
const GroceryController = new GroceryListController();
router.post('/:userId', verifyToken, GroceryController.addGroceryList);
router.get('/:userId', verifyToken, GroceryController.getGroceryList);
router.put('/update/:itemId', verifyToken, GroceryController.updateGroceryItem);

// Additional routes as needed

export default router;
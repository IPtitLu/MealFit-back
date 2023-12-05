import express, { Router } from 'express';
import GroceryListController from '../controllers/grocery.controller';

const router: Router = express.Router();
const GroceryController = new GroceryListController();
router.post('/add', GroceryController.addGroceryItem);
router.get('/:userId', GroceryController.getGroceryList);
router.put('/update/:itemId', GroceryController.updateGroceryItem);

// Additional routes as needed

export default router;
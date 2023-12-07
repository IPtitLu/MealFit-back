import GroceryListService from '../services/groceryList.service';

class GroceryListController {

    private groceryService: GroceryListService;

    constructor() {
        this.groceryService = new GroceryListService();
    }

    addGroceryItem = async (req, res) => {
        // Extract details from req and call GroceryListService.addGroceryItem
        const userId = req.params.userId;
        const { id, qty, unit } = req.body;

        try {
            // Call GroceryListService.addGroceryItem
            const groceryList = await this.groceryService.addGroceryItem(userId, id, qty, unit);

            // Return the grocery list as a JSON response
            res.json(groceryList);
        } catch (error) {
            // Return an error as a JSON response
            res.status(500).json({ error: error.message });
        }
    }

    getGroceryList = async (req, res) => {

        // Extract userId from req
        const userId = req.params.userId;

        try {
            // Call GroceryListService.getGroceryList
            const groceryList = await this.groceryService.getGroceryList(userId);

            // Return the grocery list as a JSON response
            res.json(groceryList);
        } catch (error) {
            // Return an error as a JSON response
            res.status(500).json({ error: error.message });
        }

    }

    addGroceryList = async (req, res) => {
        // Extract details from req and call GroceryListService.addGroceryList
        const userId = req.params.userId;
        const { name, items } = req.body;

        try {
            // Call GroceryListService.addGroceryList
            const groceryList = await this.groceryService.addGroceryList(userId, name, items);

            // Return the grocery list as a JSON response
            res.json(groceryList);
        } catch (error) {
            // Return an error as a JSON response
            res.status(500).json({ error: error.message });
        }
    }

    updateGroceryItem = async (req, res) => {
        // Extract details and call GroceryListService.updateGroceryItem
    }

    // Additional methods as needed
}

export default GroceryListController;

import { IGroceryItem, GroceryList as UserGroceryList } from '../models/GroceryList';
import { Types } from 'mongoose';
class GroceryListService {
    async addGroceryItem(userId: string, id: string, qty: number, unit: string) {
        try {
            const groceryItem: IGroceryItem = { ingredientId: new Types.ObjectId(id), qty, unit };
            let groceryList = await UserGroceryList.findOne({ userId });

            if (groceryList) {
                // If a list exists, add the new item to it
                groceryList.items.push(groceryItem);
            } else {
                // If no list exists, create a new one
                groceryList = new UserGroceryList({ userId, items: [groceryItem] });
            }

            await groceryList.save();
            return groceryList;
        } catch (error) {
            throw error;
        }
    }

    async getGroceryList(userId: string) {
        try {
            const groceryList = await UserGroceryList.findOne({ userId }).populate('items.ingredientId');
            return groceryList ? groceryList.items : [];
        } catch (error) {
            throw error;
        }
    }

    async updateGroceryItem(userId: string, itemId: string, updatedDetails: { quantity: number, unit: string }) {
        try {
            const groceryList = await UserGroceryList.findOne({ userId });

            if (groceryList) {
                const itemIndex = groceryList.items.findIndex(item => item.id === itemId);

                if (itemIndex > -1) {
                    groceryList.items[itemIndex].qty = updatedDetails.quantity;
                    groceryList.items[itemIndex].unit = updatedDetails.unit;
                    await groceryList.save();
                    return groceryList.items[itemIndex];
                } else {
                    throw new Error('Item not found in grocery list');
                }
            } else {
                throw new Error('Grocery list not found');
            }
        } catch (error) {
            throw error;
        }
    }

    // Additional methods like removeGroceryItem can be added as needed
}

export default GroceryListService;

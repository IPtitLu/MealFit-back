import mongoose, { Schema, Document } from 'mongoose';

interface IGroceryItem {
    ingredientId: mongoose.Types.ObjectId; // Reference to the Ingredient model
    quantityPurchased: number; // Quantity of the ingredient the user has purchased
    unit: string; // Unit of the quantity (e.g., grams, cups)
    purchaseDate: Date; // Date when the item was purchased
}

interface IUserGroceryList extends Document {
    userId: mongoose.Types.ObjectId; // Reference to the User model
    items: IGroceryItem[]; // Array of purchased items
}

const groceryItemSchema = new Schema({
    ingredientId: { type: Schema.Types.ObjectId, ref: 'Ingredient', required: true },
    quantityPurchased: { type: Number, required: true },
    unit: { type: String, required: true },
    purchaseDate: { type: Date, default: Date.now }
});

const userGroceryListSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    items: [groceryItemSchema] // Array of grocery items
});

const GroceryList = mongoose.model<IUserGroceryList>('GroceryList', userGroceryListSchema);

export default GroceryList;

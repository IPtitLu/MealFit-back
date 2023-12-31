import mongoose, { Schema, Types } from 'mongoose';

export interface IGroceryItem {
    /*  ingredientId: Types.ObjectId; */ // Reference to the Ingredient model
    name: string;
    qty?: number; // Quantity of the ingredient the user has purchased
    unit?: string; // Unit of the quantity (e.g., grams, cups)
    purchaseDate?: Date; // Date when the item was purchased
}

export interface IUserGroceryList {
    userId?: mongoose.Types.ObjectId; // Reference to the User model
    items: IGroceryItem[]; // Array of purchased items
}

const groceryItemSchema = new Schema({
    /*  ingredientId: { type: Schema.Types.ObjectId, ref: 'Ingredient', required: true, set: v => new Types.ObjectId(v) }, */
    name: { type: String, required: true },
    qty: { type: Number, default: 1 },
    unit: { type: String },
    purchaseDate: { type: Date, default: Date.now }
});

const userGroceryListSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    items: [groceryItemSchema] // Array of grocery items
});

export const GroceryList = mongoose.model('GroceryList', userGroceryListSchema);



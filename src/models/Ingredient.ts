import mongoose, { Schema, Document } from 'mongoose';

interface IIngredient extends Document {
  name: string;          // Name of the ingredient
  category: string;      // Category of the ingredient (e.g., vegetable, fruit, grain)
  nutritionPerUnit: {
    calories: number;
    protein: number;
    carbs: number;
    fats: number;
  };
  unit?: string;          // Measurement unit (e.g., grams, cups)
}

const ingredientSchema = new Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  nutritionPerUnit: {
    calories: { type: Number, required: true },
    protein: { type: Number, required: true },
    carbs: { type: Number, required: true },
    fats: { type: Number, required: true }
  },
  unit: { type: String, required: true }
});

const Ingredient = mongoose.model<IIngredient>('Ingredient', ingredientSchema);

export default Ingredient;

// src/models/recipe.model.ts
import mongoose, { Schema, Document } from 'mongoose';
import Ingredient from './Ingredient';

interface IRecipeIngredient {
  ingredient: mongoose.Types.ObjectId; // Reference to an Ingredient
  quantity: number;
  unit: string;
}

interface IRecipe extends Document {
  title: string;
  summary: string;
  servingSize: number;
  cookingMinutes: number;
  image: string;
  ingredients: IRecipeIngredient[];
  instructions: string;
  suitableFor: Array<string>; // E.g., ['vegan', 'high-protein']

}

const recipeIngredientSchema = new Schema({
  ingredient: { type: Schema.Types.ObjectId, ref: 'Ingredient', required: true },
  quantity: { type: Number, required: true },
  unit: { type: String, required: true }
});

const recipeSchema = new Schema({
  title: { type: String, required: true },
  ingredients: [recipeIngredientSchema],
  summary: { type: String, required: true },
  servingSize: { type: Number, required: true },
  cookingMinutes: { type: Number, required: true },
  image: { type: String, required: true },
  instructions: { type: String, required: true },
  suitableFor: [{ type: String, required: true }]

});

const Recipe = mongoose.model<IRecipe>('Recipe', recipeSchema);

export default Recipe;

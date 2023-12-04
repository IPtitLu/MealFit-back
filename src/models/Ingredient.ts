import mongoose from 'mongoose';

const ingredientSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  calories: { type: Number, required: true },
  proteines: { type: Number, required: true },
  glucides: { type: Number, required: true },
  graisses: { type: Number, required: true },
});

const Ingredient = mongoose.model('Ingredient', ingredientSchema);

export default Ingredient;

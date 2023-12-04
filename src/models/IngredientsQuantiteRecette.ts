import mongoose from 'mongoose';

const ingredientsQuantiteRecetteSchema = new mongoose.Schema({
  identifiantRecette: { type: mongoose.Schema.Types.ObjectId, ref: 'Recette', required: true },
  identifiantIngredient: { type: mongoose.Schema.Types.ObjectId, ref: 'Ingredient', required: true },
  quantite: { type: Number, required: true }
});

const IngredientsQuantiteRecette = mongoose.model('IngredientsQuantiteRecette', ingredientsQuantiteRecetteSchema);

export default IngredientsQuantiteRecette;

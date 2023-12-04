import mongoose from 'mongoose';

const ingredientsUtilisateurSchema = new mongoose.Schema({
  identifiantUtilisateur: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  identifiantIngredient: { type: mongoose.Schema.Types.ObjectId, ref: 'Ingredient', required: true },
  quantite: { type: Number, required: true }
});

const IngredientsUtilisateur = mongoose.model('IngredientsUtilisateur', ingredientsUtilisateurSchema);

export default IngredientsUtilisateur;

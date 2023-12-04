import mongoose from 'mongoose';

const recetteSchema = new mongoose.Schema({
  titre: { type: String, required: true },
  tempsPreparation: { type: Number, required: true },
  tempsCuisson: { type: Number, required: true },
  taillePortion: { type: Number, required: true },
  instructions: { type: String, required: true },
  identifiantCategorie: { type: mongoose.Schema.Types.ObjectId, ref: 'RecettesCategorie', required: true },
  ingredientsRecette: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Ingredient' }]
});

const Recette = mongoose.model('Recette', recetteSchema);

export default Recette;

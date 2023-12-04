import mongoose from 'mongoose';

const recettesCategorieSchema = new mongoose.Schema({
  nomCategorie: { type: String, required: true },
  recettes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Recette' }]
});

const RecettesCategorie = mongoose.model('RecettesCategorie', recettesCategorieSchema);

export default RecettesCategorie;

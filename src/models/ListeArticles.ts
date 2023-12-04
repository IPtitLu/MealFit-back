import mongoose from 'mongoose';

const listeArticlesSchema = new mongoose.Schema({
  identifiantListeCourses: { type: mongoose.Schema.Types.ObjectId, ref: 'ListeCourse', required: true },
  identifiantIngredient: { type: mongoose.Schema.Types.ObjectId, ref: 'Ingredient', required: true },
  quantite: { type: Number, required: true },
  achete: { type: Boolean, required: true }
});

const ListeArticles = mongoose.model('ListeArticles', listeArticlesSchema);

export default ListeArticles;

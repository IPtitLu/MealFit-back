import mongoose from 'mongoose';

const planningRepasSchema = new mongoose.Schema({
  identifiantUtilisateur: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, required: true },
  recettesPlanningRepas: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Recette' }]
});

const PlanningRepas = mongoose.model('PlanningRepas', planningRepasSchema);

export default PlanningRepas;

import mongoose from 'mongoose';

const recettePlanningRepasSchema = new mongoose.Schema({
  identifiantPlanningRepas: { type: mongoose.Schema.Types.ObjectId, ref: 'PlanningRepas', required: true },
  identifiantRecette: { type: mongoose.Schema.Types.ObjectId, ref: 'Recette', required: true },
  typeRepas: { type: String, required: true }
});

const RecettePlanningRepas = mongoose.model('RecettePlanningRepas', recettePlanningRepasSchema);

export default RecettePlanningRepas;

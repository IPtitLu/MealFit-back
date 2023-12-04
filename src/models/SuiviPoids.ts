import mongoose from 'mongoose';

const suiviPoidsSchema = new mongoose.Schema({
  identifiantUtilisateur: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  dateEnregistrement: { type: Date, required: true },
  poidsEnregistre: { type: Number, required: true }
});

const SuiviPoids = mongoose.model('SuiviPoids', suiviPoidsSchema);

export default SuiviPoids;

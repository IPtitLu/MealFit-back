import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
  prenom: { type: String, required: true },
  nomFamille: { type: String, required: true },
  courriel: { type: String, required: true, unique: true },
  hashMotDePasse: { type: String, required: true },
  besoinsCaloriquesQuotidiens: Number,
  poidsActuel: Number,
  objectifPoids: Number,
  taille: Number,
  dateNaissance: Date,
  genre: String,
  niveauActivite: String,
  ingredientsUtilisateur: [Number],
  planningsRepas: [Number],
  listesCourses: [Number]
});

// Méthode pour hacher le mot de passe avant de sauvegarder l'utilisateur
userSchema.pre('save', async function(next) {
  if (!this.isModified('hashMotDePasse')) return next();
  this.hashMotDePasse = await bcrypt.hash(this.hashMotDePasse, 12);
  next();
});

const User = mongoose.model('User', userSchema);

export default User;

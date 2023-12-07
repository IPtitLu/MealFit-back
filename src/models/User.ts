import bcrypt from 'bcrypt';
import mongoose, { Model, Schema, Types } from 'mongoose';
import { IRecipe } from './Recipe';


export interface IUserInfo {
  dailyCaloricNeeds: number;
  weight: number;
  weightGoal: number;
  height: number;
  birthDate: Date;
  gender: string;
  activityLevel: string;
}

const userInfoSchema = new Schema<IUserInfo>({
  dailyCaloricNeeds: { type: Number },
  weight: { type: Number },
  weightGoal: { type: Number },
  height: { type: Number },
  birthDate: { type: Date },
  gender: { type: String },
  activityLevel: { type: String }
});

export interface IUser {
  firstName?: string;
  lastName?: string;
  email: string;
  passwordHash: string;
  profile?: IUserInfo;
  favoriteRecipes?: string[];
}

const userSchema = new Schema<IUser, Model<IUser>>({
  firstName: { type: String, },
  lastName: { type: String },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  profile: { type: userInfoSchema },
  favoriteRecipes: [{ type: String }] // Reference to Recipe model
});



// Méthode pour hacher le mot de passe avant de sauvegarder l'utilisateur
userSchema.pre('save', async function (next) {
  if (!this.isModified('passwordHash')) return next();
  this.passwordHash = await bcrypt.hash(this.passwordHash, 12);
  next();
});

export const User = mongoose.model('User', userSchema);



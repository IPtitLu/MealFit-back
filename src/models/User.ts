import bcrypt from 'bcrypt';
import mongoose, { Document, Schema } from 'mongoose';


interface IUserInfo extends Document {
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

interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  passwordHash: string;
  profile?: IUserInfo;
}

const userSchema = new Schema<IUser>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  profile: { type: userInfoSchema }
});



// Méthode pour hacher le mot de passe avant de sauvegarder l'utilisateur
userSchema.pre('save', async function (next) {
  if (!this.isModified('hashMotDePasse')) return next();
  this.passwordHash = await bcrypt.hash(this.passwordHash, 12);
  next();
});

const User = mongoose.model<IUser>('User', userSchema);

export default User;

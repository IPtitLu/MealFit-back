import mongoose, { Model, Schema, } from 'mongoose';

interface IMacroTracking {
    userId: mongoose.Types.ObjectId | string; // Reference to the User model
    date: Date;
    protein: number; // Amount of protein consumed in grams
    carbs: number;   // Amount of carbohydrates consumed in grams
    fats: number;    // Amount of fats consumed in grams
}

const macroTrackingSchema = new Schema<IMacroTracking, Model<IMacroTracking>>({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    date: { type: Date, required: true },
    protein: { type: Number, required: true },
    carbs: { type: Number, required: true },
    fats: { type: Number, required: true }
});

const MacroTracking = mongoose.model('MacroTracking', macroTrackingSchema);

export default MacroTracking;

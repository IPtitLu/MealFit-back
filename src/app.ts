import express, { Application } from "express";
import dotenv from "dotenv"
import userRoutes from './routes/user.route';
import groceryRoutes from './routes/grocery.route';
import recipeRoutes from './routes/recipe.route';
import cors from 'cors';

dotenv.config()

const app: Application = express();
app.use(express.json());
app.use(cors());
app.route('/').get((req, res) => res.send('Meal fit Express + TypeScript Server'));
app.use('/api', userRoutes);
app.use('/api/groceries', groceryRoutes);
app.use('/api/recipes', recipeRoutes);

export { app };

import express, { Application } from "express";
import dotenv from "dotenv"
import userRoutes from './routes/user.route';
import groceryRoutes from './routes/grocery.route';
import recipeRoutes from './routes/recipe.route';
import cors from 'cors';
import morgan from 'morgan';

dotenv.config()

const app: Application = express();


app.use(express.json());

// log requests
/* app.use(morgan('dev')); */

// enable cors
app.use(cors());

// define a route handler for the health check route
app.route('/').get((req, res) => res.send('Meal fit Express + TypeScript Server'));

// routes
app.use('/api/users', userRoutes);
app.use('/api/groceries', groceryRoutes);
app.use('/api/recipes', recipeRoutes);

export { app };

import express, { Application } from "express";

import userRoutes from './routes/userRoutes';
import groceryRoutes from './routes/groceryRoutes';

const app: Application = express();

app.use(express.json());

app.use('/api', userRoutes);
app.use('/api/grocery', groceryRoutes);

export { app };

import mongoose from 'mongoose';
import 'dotenv/config';
import { app } from "./app";

const PORT = process.env.PORT || 3333;

const mongoURI = process.env.MONGO_URI;

mongoose.connect(mongoURI)
  .then(() => {
    console.log('Connected to MongoDB');

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Could not connect to MongoDB', err);
  });
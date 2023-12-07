import Redis from "ioredis";
import mongoose from 'mongoose';
import 'dotenv/config';
import { app } from "./app";




const PORT = process.env.PORT || 3333;

const mongoURI = process.env.MONGO_URI;









//connect to MongoDB
mongoose.connect(mongoURI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(err => {
    console.error('Could not connect to MongoDB', err);
  });

//start express server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


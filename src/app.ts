import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import connectDB from './utils/db';

import taskRoutes from './routes/taskRoutes';

// load env vars (MONGO_URI, etc)
dotenv.config();

const mongoUri = process.env.MONGO_URI;
if (!mongoUri) {
    throw new Error('MONGO_URI is not defined in the environment variables');
}

const app = express();

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Routas
app.use('/', taskRoutes);

// connect to MongoDB
connectDB();
  
// Configure port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
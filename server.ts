import express from 'express';
import dotenv from 'dotenv';
import helmet from 'helmet';
import { taskRouter, reportRouter } from './src/routes';
import connectDB from './src/config/db';

dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(helmet());

// Database connection
connectDB();

// Routes
app.use('/api', taskRouter);
app.use('/api', reportRouter);

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

export { app, server };

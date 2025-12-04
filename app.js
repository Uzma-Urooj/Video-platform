import express from "express";
import { config } from "dotenv";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import errorMiddleware from "./src/middlewares/error.middleware.js";
import userRoutes from './src/routes/user.routes.js';
import videoRoutes from './src/routes/video.routes.js';


const app = express();
config({path: "./config/.env"})

app.use(cookieParser())
app.use(express.json());

connectDB();

app.use('/api/v1/users', userRoutes);
app.use('/api/v1/video', videoRoutes);


app.use(errorMiddleware);
export default app;
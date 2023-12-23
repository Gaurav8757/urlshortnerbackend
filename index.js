import express from "express";
import dotenv from "dotenv";

import session from 'express-session';
import cors from "cors";
import connectDB from "./connection/connectDB.js";
import authRoutes from "./routes/user.routes.js";
dotenv.config();
const {port,SECRET} = process.env;
const ports = process.env.port || process.env.PORT;
const app = express();

// middlewares
app.use(cors());
app.use(express.json());
app.use(session({ secret: SECRET, resave: true, saveUninitialized: true }));

connectDB();
app.use('/', authRoutes);

// server running on port 8000
app.listen(ports, ()=>{
    try {
        console.log(`Server is running on ${port}`);
    } catch (error) {
        console.log(`Server is not running on ${port}+ ${error}`);
    }
    
});
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const { MONGO_URI, DB_NAME} = process.env;

const connectDB = async()=>{
    try {
        const connectionIns = await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`)
        console.log(`MongoDB connected !! DB Host: ${connectionIns.connection.host}`);
    } catch (error) {
        console.log("Mongo connection error", error);
        process.exit(1);
    }
}

export default connectDB;
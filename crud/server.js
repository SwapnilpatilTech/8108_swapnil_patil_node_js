import "dotenv/config"
import mongoose from "mongoose";

export const connectDB = async (uri) => {
    try {
        const conn = await mongoose.connect(uri);
        console.log("Database connected!", conn);
    } catch (error) {
        console.log("Unable to connect database!");
    }
};

import mongoose from "mongoose";
import { MONGO_URI } from "./env";

export const connectDB = async () => {
	try {
		console.log("⏳ Connecting to MongoDB...");
		await mongoose.connect(MONGO_URI);
		console.log("✅ MongoDB connected successfully!");
	} catch (error: any) {
		console.error("❌ Error connecting to MongoDB:", error.message);
		throw new Error("Something went wrong with connecting to the database");
	}
};

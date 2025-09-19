import mongoose from "mongoose";
import { MONGO_URI } from "./env";

export const connectDB = async () => {
	try {
		console.log("⏳ Connecting to MongoDB...");
		await mongoose.connect(MONGO_URI);
		console.log("✅ MongoDB connected successfully!");
	} catch (error: unknown) {
		if (error instanceof Error) {
			throw new Error(`Something went wrong: ${error.message}`);
		}
		throw new Error("Something went wrong with connecting to the database");
	}
};

import express, { type Request, type Response } from "express";
import morgan from "morgan";

import { connectDB } from "./config/db";
import { NODE_ENV, PORT } from "./config/env";
import authRouter from "./routes/authRouter";

const app = express();

// Middlewares
app.use(express.json());

if (NODE_ENV === `development`) app.use(morgan(`tiny`));

app.use(`/api/v1/auth`, authRouter);

// Routes
app.get("/api/v1/health", (_: Request, res: Response) => {
	res.json({ ok: true, time: new Date().toISOString() });
});

// Start server
(async () => {
	try {
		await connectDB();
		app.listen(PORT, () => {
			console.log(`🚀 Backend running on port ${PORT}`);
		});
	} catch (error) {
		console.error("❌ Failed to start server:", error);
		process.exit(1);
	}
})();

// startServer();

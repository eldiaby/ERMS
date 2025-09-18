import { PORT } from "./config/env";

import express from "express";
const app = express();
app.use(express.json());

app.get("/api/v1/health", (req: Request, res: Response) =>
	res.json({ ok: true, time: new Date().toISOString() }),
);

app.listen(PORT, () => console.log("Backend running on port", PORT));

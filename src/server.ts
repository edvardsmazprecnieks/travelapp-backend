import express from "express";
import type { Request, Response } from "express";
import helmet from "helmet";
import flightSearchRoutes from "./routes/api/flightSearchRoutes.js";
import userRoutes from "./routes/api/userRoutes.js";
import "dotenv/config";

const app = express();
const port = process.env["PORT"] || 3000;

app.disable("x-powered-by");

app.use(helmet());

app.use(express.json());

// app.use(express.urlencoded({ extended: true }));

app.use("/flightsearch", flightSearchRoutes);
app.use("/users", userRoutes);

app.use((err: Error, _req: Request, res: Response) => {
	console.error(err.stack);
	res.status(500).send("Something broke!");
});

app.listen(port, () => {
	console.log(`Server started on port ${port}`);
});

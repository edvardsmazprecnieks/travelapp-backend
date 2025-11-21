import { pool } from "../config/db.js";
import type { Request, Response } from "express";

export const getUserByEmail = (request: Request, response: Response) => {
	const { email } = request.params;

	pool.query(
		"SELECT * FROM users WHERE email = $1",
		[email],
		(error, results) => {
			if (error) {
				throw error;
			}
			response.status(200).json(results.rows);
		}
	);
};

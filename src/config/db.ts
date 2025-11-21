import { Pool } from "pg";

export const pool = new Pool();

export const query = (text: string, params?: any[]) => pool.query(text, params);

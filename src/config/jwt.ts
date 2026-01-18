import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const JWT_ACCESS_SECRET = process.env["JWT_ACCESS_SECRET"];
const JWT_REFRESH_SECRET = process.env["JWT_ACCESS_SECRET"];
const JWT_ACCESS_EXPIRES_IN = "15m";
const JWT_REFRESH_EXPIRES_IN = "1d";

const BCRYPT_SALT_ROUNDS = 10;

type JwtPayload = { userId: number };

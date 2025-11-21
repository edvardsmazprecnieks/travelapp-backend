import express from "express";
import { getUserByEmail } from "../../models/user.model.js";

const router = express.Router();

router.get("/:email", getUserByEmail);

export default router;

import { getUserPets } from "../controllers/pets.js";
import { isAuth } from "../middleware/is-auth.js";
import express from "express";

const router = express.Router();

router.get("/", isAuth, getUserPets);

export default router;

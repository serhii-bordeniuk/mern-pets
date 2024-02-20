import { addPet, getUserPets } from "../controllers/pets.js";
import { isAuth } from "../middleware/is-auth.js";
import express from "express";
import { body } from "express-validator";

const router = express.Router();

router.get("/", isAuth, getUserPets);

router.put(
    "/add-pet",
    [
        body("name").trim().isLength({ min: 3 }),
        body("petType").isLength({ min: 3 }),
        body("sex").isLength({ min: 4 }),
        body("breed").trim().isLength({ min: 3 }),
        body("weight").trim().isLength({ min: 1 }),
        body("birthDate").isISO8601(),
        body("description").isLength({ min: 3, max: 200 }),
    ],
    isAuth,
    addPet
);

export default router;

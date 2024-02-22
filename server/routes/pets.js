import { addPet, deletePet, getPetById, getUserPets, updatePet } from "../controllers/pets.js";
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

router.get("/:petId", isAuth, getPetById);

router.put(
    "/:petId",
    [
        body("name").optional().trim().isLength({ min: 3 }),
        body("weight").optional().trim().isLength({ min: 1 }),
        body("description").optional().isLength({ min: 3, max: 200 }),
    ],
    isAuth,
    updatePet
);

router.delete("/:petId", isAuth, deletePet);

export default router;

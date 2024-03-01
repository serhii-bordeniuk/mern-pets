import { isAuth } from "../middleware/is-auth.js";
import express from "express";
import { body } from "express-validator";
import {
    deleteUserEvent,
    getUserEventById,
    getUserEvents,
    postUserEvent,
    updateUserEvent,
} from "../controllers/events.js";

const router = express.Router();

router.get("/", isAuth, getUserEvents);

router.put(
    "/add-event",
    [
        body("eventTitle").isLength({ min: 2, max: 50 }),
        body("relatedPet").isMongoId(),
        body("date").isISO8601(),
        body("description").isLength({ min: 2, max: 100 }),
        body("reminder").isLength({ min: 2, max: 100 }),
    ],
    isAuth,
    postUserEvent
);

router.get("/:eventId", isAuth, getUserEventById);

router.put("/:eventId", isAuth, updateUserEvent);

router.delete("/:eventId", isAuth, deleteUserEvent);

export default router;

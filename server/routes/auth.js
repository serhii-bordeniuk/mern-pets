import express from "express";
import { login, signup } from "../controllers/auth.js";
import User from "../models/User.js";
import { body } from "express-validator";

const router = express.Router();

router.post(
    "/signup",
    [
        body("email")
            .isEmail()
            .withMessage("Please, enter a valid email")
            .custom((value, { req }) => {
                return User.findOne({ email: value }).then((userDoc) => {
                    if (userDoc) {
                        return Promise.reject("E-Mail address already exists!");
                    }
                });
            })
            .normalizeEmail(),
        body("password").trim().isLength({ min: 5 }),
    ],
    signup
);

router.post("/login", login);

export default router;

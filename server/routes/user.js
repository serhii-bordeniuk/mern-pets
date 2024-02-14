import express from "express";
import User from "../models/User.js";
import { getUser, updateUser, updateUserPassword } from "../controllers/user.js";
import { isAuth } from "../middleware/is-auth.js";
import { body } from "express-validator";

const router = express.Router();

router.get("/", isAuth, getUser);

router.put(
    "/",
    [
        body("username")
            .optional()
            .trim()
            .isLength({ min: 3 })
            .withMessage("Name has to be at least 3 characters"),
        body("email")
            .optional()
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
        body("phoneNumber")
            .optional()
            .isLength({ min: 13 })
            .custom((value, { req }) => {
                return User.findOne({ phoneNumber: value }).then((userDoc) => {
                    if (userDoc) {
                        return Promise.reject("This phone number already exists!");
                    }
                });
            }),
    ],
    isAuth,
    updateUser
);

router.patch(
    "/password",
    [body("oldPassword").trim().isLength({ min: 5 }), body("password").trim().isLength({ min: 5 })],
    isAuth,
    updateUserPassword
);

export default router;

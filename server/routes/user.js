import express from "express";
import User from "../models/User.js";
import { getUser, updateUser, updateUserPassword } from "../controllers/user.js";
import { isAuth } from "../middleware/is-auth.js";
import { body } from "express-validator";

const router = express.Router();

router.get("/", isAuth, getUser);

router.patch(
    "/",
    isAuth,
    [
        // body("userName").trim().isLength({ min: 3 }),
        // body("email")
        //     .isEmail()
        //     .withMessage("Please, enter a valid email")
        //     .custom((value, { req }) => {
        //         return User.findOne({ email: value }).then((userDoc) => {
        //             if (userDoc) {
        //                 return Promise.reject("E-Mail address already exists!");
        //             }
        //         });
        //     })
        //     .normalizeEmail(),
        //todo custom validation phone number
    ],
    updateUser
);

router.patch(
    "/password",
    [body("oldPassword").trim().isLength({ min: 5 }), body("password").trim().isLength({ min: 5 })],
    isAuth,
    updateUserPassword
);

export default router;

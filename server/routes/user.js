import express from "express";
import User from "../models/User.js";
import { getUser, updateUser, updateUserPassword } from "../controllers/user.js";
import { isAuth } from "../middleware/is-auth.js";
import { body } from "express-validator";

const router = express.Router();

router.get("/", isAuth, getUser);

router.put("/", isAuth, updateUser);

router.patch(
    "/password",
    [body("oldPassword").trim().isLength({ min: 5 }), body("password").trim().isLength({ min: 5 })],
    isAuth,
    updateUserPassword
);

export default router;

import bcrypt from "bcrypt";
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";

import User from "../models/User.js";

export const signup = async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const error = new Error("Validation failed");
        error.statusCode = 422;
        error.data = errors.array();
        throw error;
    }

    const email = req.body.email;
    const password = req.body.password;

    try {
        const hashedPw = await bcrypt.hash(password, 12);

        const user = new User({
            email: email,
            password: hashedPw,
        });

        const result = await user.save();
        res.status(201).json({ message: "User created", userId: result._id });
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
};

// export const login = async (req, res, next) => {};

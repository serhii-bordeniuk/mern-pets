import bcrypt from "bcrypt";
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import { handleErrors } from "../utlis/utlis.js";

import User from "../models/User.js";

export const signup = async (req, res, next) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            const errorMsgs = errors.array().map((error) => error.msg);
            const error = new Error(`${errorMsgs.join(", ")}`);
            error.statusCode = 422;
            error.data = errors.array();
            throw error;
        }
        const email = req.body.email;
        const password = req.body.password;

        const hashedPw = await bcrypt.hash(password, 12);

        const user = new User({
            email: email,
            password: hashedPw,
        });

        const result = await user.save();
        res.status(201).json({ message: "User created", userId: result._id });
    } catch (error) {
        handleErrors(error, next);
    }
};

export const login = async (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    let loadedUser;

    try {
        const user = await User.findOne({ email: email });
        if (!user) {
            const error = new Error("Wrong credentials. Try again.");
            error.statusCode = 401;
            throw error;
        }
        loadedUser = user;
        const isEqual = await bcrypt.compare(password, user.password);
        if (!isEqual) {
            const error = new Error("Wrong credentials. Try again.");
            error.statusCode = 401;
            throw error;
        }
        const token = jwt.sign(
            {
                email: loadedUser.email,
                userId: loadedUser._id.toString(),
            },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );
        res.status(200).json({ message: "Successfully Logged In", token: token, userId: loadedUser._id.toString() });
    } catch (error) {
        handleErrors(error, next);
    }
};

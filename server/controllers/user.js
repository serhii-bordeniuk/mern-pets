import { validationResult, matchedData } from "express-validator";
import User from "../models/User.js";
import bcrypt from "bcrypt";

export const getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.userId);
        if (!user) {
            const error = new Error("User not found.");
            error.statusCode = 404;
            throw error;
        }
        res.status(200).json(user);
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
};

export const updateUser = async (req, res, next) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            const errorMsgs = errors.array().map((error) => error.msg);
            const error = new Error(`${errorMsgs.join(", ")}`); 
            error.statusCode = 422;
            error.data = errors.array();
            throw error;
        }

        const user = await User.findById(req.userId);

        if (!user) {
            const error = new Error("User not found.");
            error.statusCode = 404;
            throw error;
        }

        Object.keys(req.body).forEach((key) => {
            if (user[key] !== undefined) {
                user[key] = req.body[key];
            }
        });

        await user.save();
        return res.status(200).json({
            user: { userName: user.userName, email: user.email, phoneNumber: user.phoneNumber },
            message: "User updated",
        });
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
};

export const updateUserPassword = async (req, res, next) => {
    try {
        const { oldPassword, password } = req.body;
        const user = await User.findById(req.userId);
        if (!user) {
            if (!user) {
                const error = new Error("User not found.");
                error.statusCode = 404;
                throw error;
            }
        }

        const isEqual = await bcrypt.compare(oldPassword, user.password);
        if (!isEqual) {
            const error = new Error("Wrong password!");
            error.statusCode = 401;
            throw error;
        }

        const hashedPw = await bcrypt.hash(password, 12);

        user.password = hashedPw;

        const result = await user.save();
        res.status(201).json({ message: "password updated" });
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
};

import { validationResult } from "express-validator";
import User from "../models/User.js";
import Pet from "../models/Pet.js";
import Expense from "../models/Expense.js";
import Event from "../models/Event.js";
import bcrypt from "bcrypt";
import { handleErrors } from "../utlis/utlis.js";
import { clearFile } from "../index.js";

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
        handleErrors(error, next);
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

        let imageUrl = req.body.image;
        
        if (req.files.image) {
            imageUrl = req.files.image[0].path;
        }
        
        if (imageUrl !== user.picturepath) {
            clearFile(user.picturepath);
        }

        if (imageUrl !== user.picturepath) {
            clearFile(user.picturepath);
        }

        user.picturepath = imageUrl;

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
        handleErrors(error, next);
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
        handleErrors(error, next);
    }
};

export const deleteUser = async (req, res, next) => {
    try {
        const userId = req.userId;
        const userToDelete = await User.findById(userId);
        if (!userToDelete) {
            const error = new Error("User not found.");
            error.statusCode = 404;
            throw error;
        }
        // Unlink relationships
        await Promise.all([
            Pet.deleteMany({ _id: { $in: userToDelete.pets } }),
            Event.deleteMany({ _id: { $in: userToDelete.events } }),
            Expense.deleteMany({ _id: { $in: userToDelete.expenses } }),
        ]);

        if (userToDelete.picturepath) {
            clearFile(userToDelete.picturepath);
        }

        const deletedUser = await User.findByIdAndDelete(userToDelete._id);
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        handleErrors(error, next);
    }
};

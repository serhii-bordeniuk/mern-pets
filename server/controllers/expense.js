import { validationResult } from "express-validator";
import { handleErrors } from "../utlis/utlis.js";
import User from "../models/User.js";
import Expense from "../models/Expense.js";

export const getUserExpenses = async (req, res, next) => {
    const userId = req.userId;
    try {
        const user = await User.findById(userId).populate({
            path: "expenses",
            populate: {
                path: "pet",
                model: "Pet",
                select: "name",
            },
        });
        if (!user) {
            const error = new Error("User not found.");
            error.statusCode = 404;
            throw error;
        }

        const expenses = user.expenses;

        res.status(200).json({ message: "Expenses fetched successfully", expenses });
    } catch (error) {
        handleErrors(error, next);
    }
};

export const postUserExpense = async (req, res, next) => {
    const userId = req.userId;
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const errorMsgs = errors.array().map((error) => error.msg);
            const error = new Error(`${errorMsgs.join(", ")}`);
            error.statusCode = 422;
            error.data = errors.array();
            throw error;
        }
        const { category, price, description, pet, date } = req.body;

        const expense = new Expense({
            category: category,
            price: price,
            description: description,
            pet: pet,
            date: date,
            owner: userId,
        });

        await expense.save();

        const user = await User.findById(userId);
        if (!user) {
            const error = new Error("User not found.");
            error.statusCode = 404;
            throw error;
        }

        user.expenses.push(expense);
        await user.save();
        res.status(201).json({ message: "Expense succesfully added", expense: expense });
    } catch (error) {
        handleErrors(error, next);
    }
};

export const deleteUserExpense = async (req, res, next) => {
    try {
        const userId = req.userId;
        const expenseId = req.params.expenseId;
        const expenseToDelete = await Expense.findById(expenseId);
        if (expenseToDelete.owner.toString() !== userId) {
            const error = new Error("Not authorized!");
            error.statusCode = 403;
            throw error;
        }
        const user = await User.findById(userId);
        if (!user) {
            const error = new Error("User not found.");
            error.statusCode = 404;
            throw error;
        }
        user.expenses.pull(expenseId);
        await user.save();

        await Expense.findByIdAndDelete(expenseId);
        res.status(200).json({ message: "Expense deleted successfully." });
    } catch (error) {
        handleErrors(error, next);
    }
};

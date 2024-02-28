import { isAuth } from "../middleware/is-auth.js";
import express from "express";
import { body } from "express-validator";
import { deleteUserExpense, getUserExpenses, postUserExpense } from "../controllers/expense.js";

const router = express.Router();

router.get("/", isAuth, getUserExpenses);

router.put(
    "/add-expense",
    [
        body("category").isLength({ min: 3 }),
        body("price").isLength({ min: 1 }),
        body("description").isLength({ min: 2, max: 200 }),
        body("pet").isMongoId(),
        body("date").isISO8601(),
    ],
    isAuth,
    postUserExpense
);

router.delete("/:expenseId", isAuth, deleteUserExpense);

export default router;

import mongoose, { SchemaTypes } from "mongoose";

const expenseSchema = new mongoose.Schema({
    owner: {
        type: SchemaTypes.ObjectId,
        ref: "User",
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    pet: {
        type: SchemaTypes.ObjectId,
        ref: "Pet",
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
});

const Expense = mongoose.model("Expense", expenseSchema);
export default Expense;

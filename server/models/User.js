import mongoose, { SchemaTypes } from "mongoose";

// const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    userName: String,
    phoneNumber: String,
    picturepath: String,
    pets: [
        {
            type: SchemaTypes.ObjectId,
            ref: "Pet",
        },
    ],
    expenses: [
        {
            type: SchemaTypes.ObjectId,
            ref: "Expense",
        },
    ],
    events: [
        {
            type: SchemaTypes.ObjectId,
            ref: "Event",
        },
    ],
});

const User = mongoose.model("User", userSchema);

export default User;

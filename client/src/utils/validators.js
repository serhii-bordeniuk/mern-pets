import * as yup from "yup";

export const accountSchema = yup.object({
    userName: yup
        .string()
        .matches(/^[a-zA-Z\s]+$/, "Full Name must contain only letters")
        .min(3, "Full Name must be at least 3 characters"),
    email: yup.string().email().min(4),

    phoneNumber: yup
        .string()
        .nullable()
        .matches(/^\+?\d{11,12}$/, "Phone number must contain only numbers and '+'"),
});

export const changePasswordSchema = yup.object({
    oldPassword: yup
        .string()
        .min(8, "Password must be at least 8 characters")
        .max(32, "Password can't be longer than 32 characters")
        .required("password is a required field"),
    password: yup.string().min(8).max(32),
    confirmedPassword: yup
        .string()
        .required("confirm password is a required field")
        .nullable()
        .test("match", "Passwords must match", function (value) {
            if (value === null) {
                return false;
            }
            return value === this.parent.password;
        }),
});

export const petDedailsSchema = yup.object({
    name: yup
        .string()
        .matches(/^[a-zA-Z]+$/, "Name must contain only letters")
        .min(3, "Name must be at least 3 characters"),
    weight: yup.string().matches(/^[0-9]+$/, "Weight must contain only numbers"),
    birthDate: yup.date().required("This is a required field"),
    description: yup.string().min(2, "Description must be at least 2 characters").max(100),
});

export const expenseAddSchema = yup.object({
    category: yup.string().required("Select a valid option"),
    price: yup.string().matches(/^[0-9]+$/, "Price must contain only numbers"),
    description: yup.string().min(2, "Description must be at least 2 characters").max(100),
    pet: yup.string().required("Select a valid option"),
    date: yup.date().required("Birth Date is a required field"),
});

export const eventAddSchema = yup.object({
    eventTitle: yup
        .string()
        .matches(/^[a-zA-Z\s]+$/, "Title must contain only letters")
        .min(2, "Title must be at lesat 2 characters")
        .max(50, "Title can't be longer than 50 characters"),
    relatedPet: yup.string().required("Select a valid option"),
    date: yup.date().required("Date is a required field"),
    description: yup
        .string()
        .min(2, "Description must be at least 2 characters")
        .max(100, "Description can't be longer than 100 characters"),
    reminder: yup
        .string()
        .min(2, "Reminder must be at least 2 characters")
        .max(100, "Reminder can't be longer than 100 characters"),
});

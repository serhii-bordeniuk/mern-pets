import User from "../models/User.js";
import Pet from "../models/Pet.js";
import { validationResult } from "express-validator";

export const getUserPets = async (req, res, next) => {
    const userId = req.userId;
    try {
        const user = await User.findById(userId).populate("pets");
        if (!user) {
            const error = new Error("User not found.");
            error.statusCode = 404;
            throw error;
        }

        res.status(200).json({ message: "Pets fetched successfully.", pets: user.pets });
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
};

export const addPet = async (req, res, next) => {
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

        const { name, petType, sex, breed, weight, birthDate, description } = req.body;

        const pet = new Pet({
            name: name,
            petType: petType,
            sex: sex,
            breed: breed,
            weight: weight,
            birthDate: birthDate,
            description: description,
            owner: userId,
        });

        await pet.save();

        const user = await User.findById(req.userId);
        if (!user) {
            const error = new Error("User not found.");
            error.statusCode = 404;
            throw error;
        }
        user.pets.push(pet);
        await user.save();
        res.status(200).json({
            message: "Pet added successfully",
            pet: pet,
            owner: { _id: userId },
        });
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
};

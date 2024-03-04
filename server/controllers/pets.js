import User from "../models/User.js";
import Pet from "../models/Pet.js";
import { validationResult } from "express-validator";
import { handleErrors } from "../utlis/utlis.js";
import { clearFile } from "../index.js";

export const getUserPets = async (req, res, next) => {
    const userId = req.userId;
    try {
        const user = await User.findById(userId).populate("pets");
        if (!user) {
            const error = new Error("User not found.");
            error.statusCode = 404;
            throw error;
        }

        const pets = user.pets.map((pet) => ({
            _id: pet._id,
            name: pet.name,
            picturepath: pet.picturepath,
        }));

        res.status(200).json({ message: "Pets fetched successfully.", pets: pets });
    } catch (error) {
        handleErrors(error, next);
    }
};

export const getPetById = async (req, res, next) => {
    const petId = req.params.petId;
    try {
        const pet = await Pet.findById(petId);
        if (!pet) {
            const error = new Error("Could not find pet.");
            error.statusCode = 404;
            throw error;
        }
        if (pet.owner.toString() !== req.userId) {
            const error = new Error("Not authorized!");
            error.statusCode = 403;
            throw error;
        }

        res.status(200).json({ message: "Pet fetched", pet: pet });
    } catch (error) {
        handleErrors(error, next);
    }
};

export const addPet = async (req, res, next) => {
    const userId = req.userId;
    const { image } = req.files;
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
        let imageUrl = "";
        if (image) {
            imageUrl = image[0].path;
        }

        const pet = new Pet({
            name: name,
            petType: petType,
            sex: sex,
            breed: breed,
            weight: weight,
            birthDate: birthDate,
            description: description,
            owner: userId,
            picturepath: imageUrl,
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
        handleErrors(error, next);
    }
};

export const updatePet = async (req, res, next) => {
    try {
        const { name, weight, description } = req.body;
        const { image, passportFile, medCardFile, otherDocFile } = req.files;
        const petId = req.params.petId;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const errorMsgs = errors.array().map((error) => error.msg);
            const error = new Error(`${errorMsgs.join(", ")}`);
            error.statusCode = 422;
            error.data = errors.array();
            throw error;
        }
        const pet = await Pet.findById(petId);
        if (pet.owner.toString() !== req.userId) {
            const error = new Error("Not authorized!");
            error.statusCode = 403;
            throw error;
        }

        let imageUrl = req.body.image;
        let passportpath = req.body.passportFile;
        let medcardpath = req.body.medCardFile;
        let anotherdocpath = req.body.otherDocFile;

        if (image) {
            imageUrl = image[0].path;
        }

        if (passportFile) {
            passportpath = passportFile[0].path;
        }
        if (medCardFile) {
            medcardpath = medCardFile[0].path;
        }
        if (otherDocFile) {
            anotherdocpath = otherDocFile[0].path;
        }

        if (imageUrl !== pet.picturepath) {
            clearFile(pet.picturepath);
        }
        if (passportpath !== pet.passportpath) {
            clearFile(pet.passportpath);
        }
        if (medcardpath !== pet.medcardpath) {
            clearFile(pet.medcardpath);
        }
        if (anotherdocpath !== pet.anotherdocpath) {
            clearFile(pet.anotherdocpath);
        }

        //todo optimize the code above

        pet.picturepath = imageUrl;
        pet.passportpath = passportpath;
        pet.medcardpath = medcardpath;
        pet.anotherdocpath = anotherdocpath;
        pet.name = name;
        pet.description = description;
        pet.weight = weight;
        await pet.save();

        res.status(200).json({ message: "Pet successfully updated." });
    } catch (error) {
        handleErrors(error, next);
    }
};

export const deletePet = async (req, res, next) => {
    try {
        const petId = req.params.petId;
        const petToDelete = await Pet.findById(petId);
        if (petToDelete.owner.toString() !== req.userId) {
            const error = new Error("Not authorized!");
            error.statusCode = 403;
            throw error;
        }
        const user = await User.findById(req.userId);
        if (!user) {
            const error = new Error("User not found.");
            error.statusCode = 404;
            throw error;
        }

        user.pets.pull(petId);
        await user.save();

        if (petToDelete.picturepath) {
            clearFile(petToDelete.picturepath);
        }
        //todo delete documents
        await Pet.findByIdAndDelete(petId);
        res.status(200).json({ message: "Pet deleted successfully." });
    } catch (error) {
        handleErrors(error, next);
    }
};

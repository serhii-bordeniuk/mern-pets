import { validationResult } from "express-validator";
import { handleErrors } from "../utlis/utlis.js";
import Event from "../models/Event.js";
import User from "../models/User.js";

export const getUserEvents = async (req, res, next) => {
    try {
        const userId = req.userId;
        const user = await User.findById(userId).populate({
            path: "events",
            populate: {
                path: "relatedPet",
                model: "Pet",
                select: "name picturepath",
            },
        });
        if (!user) {
            const error = new Error("User not found.");
            error.statusCode = 404;
            throw error;
        }
        const events = user.events;
        res.status(200).json({ message: "Events fetched successfully", events });
    } catch (error) {
        handleErrors(error, next);
    }
};

export const postUserEvent = async (req, res, next) => {
    try {
        const userId = req.userId;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const errorMsgs = errors.array().map((error) => error.msg);
            const error = new Error(`${errorMsgs.join(", ")}`);
            error.statusCode = 422;
            error.data = errors.array();
            throw error;
        }
        const { eventTitle, relatedPet, date, description, reminder } = req.body;

        const event = new Event({
            owner: userId,
            eventTitle: eventTitle,
            relatedPet: relatedPet,
            date: date,
            description: description,
            reminder: reminder,
        });

        await event.save();

        const user = await User.findById(userId);
        if (!user) {
            const error = new Error("User not found.");
            error.statusCode = 404;
            throw error;
        }

        user.events.push(event);
        await user.save();
        res.status(201).json({ message: "Event succesfully added", event: event });
    } catch (error) {
        handleErrors(error, next);
    }
};

export const getUserEventById = async (req, res, next) => {
    const eventId = req.params.eventId;
    try {
        const event = await Event.findById(eventId);
        if (!event) {
            const error = new Error("Could not find event.");
            error.statusCode = 404;
            throw error;
        }
        if (event.owner.toString() !== req.userId) {
            const error = new Error("Not authorized!");
            error.statusCode = 403;
            throw error;
        }
        res.status(200).json(event);
    } catch (error) {
        handleErrors(error, next);
    }
};

export const updateUserEvent = async (req, res, next) => {
    try {
        const eventId = req.params.eventId;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const errorMsgs = errors.array().map((error) => error.msg);
            const error = new Error(`${errorMsgs.join(", ")}`);
            error.statusCode = 422;
            error.data = errors.array();
            throw error;
        }

        const event = await Event.findById(eventId);
        if (!event) {
            const error = new Error("Could not find event.");
            error.statusCode = 404;
            throw error;
        }
        if (event.owner.toString() !== req.userId) {
            const error = new Error("Not authorized!");
            error.statusCode = 403;
            throw error;
        }
        const { eventTitle, relatedPet, date, description, reminder } = req.body;

        event.eventTitle = eventTitle;
        event.relatedPet = relatedPet;
        event.date = date;
        event.description = description;
        event.reminder = reminder;

        await event.save();
        res.status(200).json({ message: "Event successfully updated." });
    } catch (error) {
        handleErrors(error, next);
    }
};

export const deleteUserEvent = async (req, res, next) => {
    try {
        const eventId = req.params.eventId;
        const eventToDelete = await Event.findById(eventId);
        if (eventToDelete.owner.toString() !== req.userId) {
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
        user.events.pull(eventId);
        await user.save();

        await Event.findByIdAndDelete(eventId);
        res.status(200).json({ message: "Event deleted successfully." });
    } catch (error) {
        handleErrors(error, next);
    }
};

import User from "../models/User.js";

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
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

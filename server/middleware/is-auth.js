import jwt from "jsonwebtoken";

export const isAuth = (req, res, next) => {
    const authHeader = req.get("Authorization");
    if (!authHeader) {
        const error = new Error("Not authenticated.");
        error.statusCode = 401;
        return next(error);
    }

    const token = authHeader.split(" ")[1];

    let decodedToken;
    try {
        decodedToken = jwt.verify(token, process.env.JWT_SECRET );
        req.userId = decodedToken.userId;
        next();
    } catch (err) {
        const error = new Error("Not authenticated.");
        error.statusCode = 401;
        return next(error);
    }
};

import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import fs from "fs";

import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/user.js";
import petsRoutes from "./routes/pets.js";
import expensesRoutes from "./routes/expenses.js";
import eventsRoutes from "./routes/events.js"

import { fileURLToPath } from "url";

/* config */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/documents", express.static(path.join(__dirname, "documents")));

/* files upload */

const fileFilter = (req, file, cb) => {
    if (
        file.mimetype === "image/png" ||
        file.mimetype === "image/jpg" ||
        file.mimetype === "image/jpeg" ||
        file.mimetype === "application/pdf"
    ) {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        let destinationFolder = "images";
        if (file.mimetype === "application/pdf") {
            destinationFolder = "documents";
        }
        cb(null, destinationFolder);
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString().replace(/:/g, "-") + "-" + file.originalname);
    },
});

app.use(
    multer({
        storage: fileStorage,
        limits: { fileSize: 1024 * 1024 * 5 },
        fileFilter: fileFilter,
    }).fields([
        { name: "image", maxCount: 1 },
        { name: "passportFile", maxCount: 1 },
        { name: "medCardFile", maxCount: 1 },
        { name: "otherDocFile", maxCount: 1 },
    ])
);

export const clearFile = (filePath) => {
    filePath = path.join(__dirname, filePath);
    fs.unlink(filePath, (err) => console.log(err));
};

/* routes */

app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/pets", petsRoutes);
app.use("/expenses", expensesRoutes);
app.use("/events", eventsRoutes)

/* errors handler */

app.use((error, req, res, next) => {
    console.log("error", error);
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({ message: message, data: data });
});

/* mongoose setup */

const PORT = process.env.PORT || 6001;
mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
        app.listen(PORT, () => console.log(`Server Port ${PORT}`));
    })
    .catch((error) => console.log(error));

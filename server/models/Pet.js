import mongoose, { SchemaTypes } from "mongoose";

const petSchema = new mongoose.Schema({
    owner: {
        type: SchemaTypes.ObjectId,
        ref: "User",
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    petType: {
        type: String,
        required: true,
    },
    sex: {
        type: String,
        required: true,
    },
    breed: {
        type: String,
        required: true,
    },
    weight: {
        type: Number,
        required: true,
    },
    birthDate: {
        type: Date,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    petPicturePath: {
        type: String,
        
    },
    documentPath: String,
});

const Pet = mongoose.model("Pet", petSchema);

export default Pet;

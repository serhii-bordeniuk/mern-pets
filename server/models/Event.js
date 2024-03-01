import mongoose, { SchemaTypes } from "mongoose";
const Schema = mongoose.Schema;

const eventSchema = new Schema({
    owner: {
        type: SchemaTypes.ObjectId,
        ref: "User",
        required: true,
    },
    eventTitle: {
        type: String,
        required: true,
    },
    relatedPet: {
        type: SchemaTypes.ObjectId,
        ref: "Pet",
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    reminder: {
        type: String,
        required: true,
    },
});

const Event = mongoose.model("Event", eventSchema);
export default Event;

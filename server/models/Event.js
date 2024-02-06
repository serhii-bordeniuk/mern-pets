import mongoose, { SchemaTypes } from "mongoose";
const Schema = mongoose.Schema;

const eventSchema = new Schema({
    owner: {
        type: SchemaTypes.ObjectId,
        ref: "User",
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    relatedPet: {
        type: SchemaTypes.ObjectId,
        ref: "Pet",
        required: true,
    },
});

const Event = mongoose.model("Event", eventSchema);
export default Event;

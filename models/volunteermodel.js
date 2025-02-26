import mongoose from "mongoose";

const volunteerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    phone: {
        type: String,
        required: true,
        trim: true,
    },
    skills: {
        type: [String],
        required: true,
    },
    message: {
        type: String,
        trim: true,
    },
}, { timestamps: true });

const Volunteer = mongoose.model("Volunteer", volunteerSchema);
export default Volunteer;